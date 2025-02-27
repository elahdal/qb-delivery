local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config
local deliveryManagerPed
local notepad
local boxProp = nil
local triggerBoxAnimation, clearBoxAnimation = nil, nil
local animationOn = false


local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function SpawnDeliveryManager()
  local model = cfg.DeliveryManagerPed.model
  local propModel = cfg.DeliveryManagerPed.propModel
  
  RequestModel(model)
  RequestModel(propModel)
  
  while not HasModelLoaded(model) do
      Wait(100)
  end
  while not HasModelLoaded(propModel) do
      Wait(100)
  end
  
  deliveryManagerPed = CreatePed(0, model, cfg.DeliveryManagerPed.coords.x, cfg.DeliveryManagerPed.coords.y, cfg.DeliveryManagerPed.coords.z, cfg.DeliveryManagerPed.coords.w, false, false)
  notepad = CreateObject(propModel, cfg.DeliveryManagerPed.coords.x, cfg.DeliveryManagerPed.coords.y, cfg.DeliveryManagerPed.coords.z, true, true, false)

  AttachEntityToEntity(notepad, deliveryManagerPed, GetPedBoneIndex(deliveryManagerPed, 36029), 0.1, 0.0, 0.1, 255.0, 300.0, 0.0, true, true, false, true, 1, true)
  SetEntityInvincible(deliveryManagerPed, true)
  FreezeEntityPosition(deliveryManagerPed, true)
  SetBlockingOfNonTemporaryEvents(deliveryManagerPed, true)
  SetPedDefaultComponentVariation(deliveryManagerPed)
  SetPedComponentVariation(deliveryManagerPed, 9, 0, 0, 0)
  
  -- Chargement et exécution de l'animation
  local animDict = "amb@world_human_clipboard@male@base"
  RequestAnimDict(animDict)
  while not HasAnimDictLoaded(animDict) do
      Wait(100)
      print("[DEBUG] En attente du chargement de l'animation...")
  end
  TaskPlayAnim(deliveryManagerPed, animDict, "base", 8.0, -8.0, -1, 1, 0, false, false, false)
end

local function SpawnDeliveryVehicules()
  for _, vehicleInfo in ipairs(cfg.DeliveryVehicles) do
    local model = vehicleInfo.model
    RequestModel(model)
    while not HasModelLoaded(model) do
      Wait(10)
    end

    local vehicle = CreateVehicle(model, vehicleInfo.coords.x, vehicleInfo.coords.y, vehicleInfo.coords.z, vehicleInfo.coords.w, false, false)
    if vehicle then
      SetEntityAsMissionEntity(vehicle, true, true)
      SetVehicleOnGroundProperly(vehicle)
      SetVehicleDoorsLocked(vehicle, 2)
      SetVehicleDirtLevel(vehicle, 0.0)
      FreezeEntityPosition(vehicle, true)
    end
    
    SetModelAsNoLongerNeeded(model)
  end
  
end

local function GetNearestAdress(dataAdress)
  local allAddresses = {}
  for _, addr in pairs(dataAdress) do
    table.insert(allAddresses, addr)
  end

  -- Shuffle the addresses randomly
  for i = #allAddresses, 2, -1 do
    local j = math.random(i)
    allAddresses[i], allAddresses[j] = allAddresses[j], allAddresses[i]
  end

  -- Take only 10 random addresses (or all if fewer than 10)
  local selectedAddresses = {}
  for i = 1, math.min(1, #allAddresses) do
    table.insert(selectedAddresses, allAddresses[i])
  end

  local distances = {}
  local playerCoords = GetEntityCoords(PlayerPedId())
  for _, addr in ipairs(selectedAddresses) do
    -- print("[DEBUG: GetNearestAdress] Adresse: " .. addr.label)
    local addrCoords = vector3(addr.coords.x, addr.coords.y, addr.coords.z)
    local distance = #(playerCoords - addrCoords)
    -- print("[DEBUG: GetNearestAdress] Distance to address: " .. distance)
    table.insert(distances, {
      coords = addr.coords,
      label = addr.label,
      zip = addr.ZipCode,
      distance = distance
    })
  end

  table.sort(distances, function(a, b)
    return a.distance < b.distance
  end)

  return distances
end

local function applyDeliveryBonus(deliveryTimeSeconds)
  local bonusMultiplier = 1.1
  local averageTime = 200 
  if deliveryTimeSeconds < averageTime then
    -- Si la livraison est plus rapide que la moyenne, le multiplicateur augmente linéairement de 1.1 à 2
    bonusMultiplier = 2 - ((deliveryTimeSeconds / averageTime) * 0.9)
    QBCore.Functions.Notify('Bonus de livraison rapide appliqué! Multiplicateur: ' .. string.format("%.2f", bonusMultiplier), 'success', 5000)
  end
  -- Arrondir le multiplicateur pour conserver deux chiffres après la virgule
  bonusMultiplier = math.floor(bonusMultiplier * 100 + 0.5) / 100

  return bonusMultiplier
end

local function CheckForArrival(destination, destinationBlip)
  local arrived = false
  local deliveryStartTime = GetGameTimer() -- Start time in ms
  local deliveryTime
  while not arrived do
    Wait(500)
    local playerCoords = GetEntityCoords(PlayerPedId())
    if #(playerCoords - vector3(destination.x, destination.y, destination.z)) < 1.0 and animationOn then
      deliveryTime = GetGameTimer() - deliveryStartTime
      local deliveryTimeSeconds = deliveryTime / 1000
      -- print("[DEBUG: CheckForArrival] Delivery time: " .. deliveryTimeSeconds)
      RemoveBlip(destinationBlip)
      if clearBoxAnimation then
         clearBoxAnimation()
      end
      local bonusMultiplier = applyDeliveryBonus(deliveryTimeSeconds)
      -- Pense ici a customiser l'UI pour popup
      QBCore.Functions.Notify('Vous êtes arrivé à destination!', 'success', 5000)
      TriggerServerEvent('qb-delivery:server:UpdateDB', cfg.DeliveryPayment.wagePerDelivery * bonusMultiplier)
      arrived = true
    else
      CreateThread(function()
        while not arrived do
          Wait(0)
            DrawMarker(27, destination.x, destination.y, destination.z - 0.9, 0.0, 0.0, 0.0, 0.0, 180.0, 0.0, 1.0, 1.0, 1.0, 255, 255, 0, 150, false, true, 2, nil, nil, false)
        end
      end)    
      end
  end
  return deliveryTime / 1000
end

local function StartDeliveryMission()
  local missionFinished = false
  local sortedAddresses = GetNearestAdress(cfg.DeliveryAdresses)
  TriggerServerEvent('qb-delivery:server:StoreInDB')
  for i = 1, #sortedAddresses do
    Wait(500)  -- Small delay between iterations
    local dataAdress = sortedAddresses[i]
    local destination = dataAdress.coords
    local destinationLabel = dataAdress.label
    local destinationBlip = AddBlipForCoord(destination.x, destination.y, destination.z)
    SetBlipRoute(destinationBlip, true)
    print('Destination Label For loop:', destinationLabel)
    
    -- Appel de la fonction externe pour attendre l'arrivée
    CheckForArrival(destination, destinationBlip)
    -- zone()

  end
  missionFinished = true
  return missionFinished

end

local function SpawnPedInVehicule()
  local model = cfg.DeliveryPlayerVehicle.model
  RequestModel(model)
  while not HasModelLoaded(model) do
    Wait(10)
  end

  local vehicle = CreateVehicle(model, cfg.DeliveryPlayerVehicle.coords.x, cfg.DeliveryPlayerVehicle.coords.y, cfg.DeliveryPlayerVehicle.coords.z, cfg.DeliveryPlayerVehicle.coords.w, false, false)
  exports.ox_target:removeLocalEntity(vehicle)
  exports.ox_target:addLocalEntity(vehicle, {
    label = 'Take Box',
    name = 'deliveryJob',
    icon = 'fa-solid fa-box',

    onSelect = function()
      if triggerBoxAnimation then
        triggerBoxAnimation()
      end
    end

  })
  exports.ox_target:addLocalEntity(vehicle, {
    label = 'Drop Box',
    name = 'Boxb',
    icon = 'fa-solid fa-box-open',

    onSelect = function()
      if clearBoxAnimation then
        clearBoxAnimation()
      end
    end

  })
  
  print("[DEBUG: SpawnPedInVehicule] Véhicule created")
  if vehicle then
    SetEntityAsMissionEntity(vehicle, true, true)
    SetVehicleOnGroundProperly(vehicle)

    -- Spawn player inside vehicle
    local playerPed = PlayerPedId()

    SetPedIntoVehicle(playerPed, vehicle, -1) -- -1 puts player in driver seat
    TriggerEvent('vehiclekeys:client:SetOwner', QBCore.Functions.GetPlate(vehicle))
    
    local sortedAddresses = GetNearestAdress(cfg.DeliveryAdresses)
    for _, address in ipairs(sortedAddresses) do
        print("Sorted Addresses", address.label)
    end

    if StartDeliveryMission() then
      QBCore.Functions.Notify('You have completed the delivery!', 'success', 5000)
    else
      QBCore.Functions.Notify('You have failed the delivery!', 'error', 5000)
    end
    -- /!\ On rentre dans une boucle donc vaut mieux faire la boucle checkifArrived dans un thread
  end

  SetModelAsNoLongerNeeded(model)
  -- si en mode multijoueur utiliser ce vehicule pur placer les joueurs
  return vehicle
end

local function createDeliveryBlip(x, y, z, label, iconSprite)
  -- Utilise par défaut l'icone "fa-solid fa-truck-fast" et la remplace par son sprite (ici : 477, à ajuster selon vos besoins)
  iconSprite = iconSprite or "fa-solid fa-truck-fast"
  if type(iconSprite) == "string" and iconSprite == "fa-solid fa-truck-fast" then
      iconSprite = 616
  end

  local blip = AddBlipForCoord(x, y, z)
  SetBlipSprite(blip, iconSprite)
  SetBlipDisplay(blip, 2)
  SetBlipScale(blip, 0.7)
  SetBlipColour(blip, 2)
  
  BeginTextCommandSetBlipName("STRING")
  AddTextComponentString(label or "Delivery")
  EndTextCommandSetBlipName(blip)
  
  return blip
end

local function GetNearestPlayers()
  local Squad = {}
  local nearestPlayer = GetClosestPedToPlayer()
  local nearestPlayerId = GetPlayerServerId(NetworkGetPlayerIndexFromPed(nearestPlayer))
  local nearestPlayerData = QBCore.Functions.GetPlayerData(nearestPlayerId)
  local charName = nearestPlayerData.charinfo.firstname .. " " .. nearestPlayerData.charinfo.lastname

  if nearestPlayerData and charName then
    table.insert(Squad, {
      id = nearestPlayerId,
      name = charName,
      distance = #(GetEntityCoords(PlayerPedId()) - GetEntityCoords(nearestPlayerData))
    })
  end

  return Squad
end

local function test()
  local Player = QBCore.Functions.GetPlayerData()
  local charName = Player.charinfo.firstname .. " " .. Player.charinfo.lastname
  local inGameId = GetPlayerServerId(PlayerId())
  print("charName hahaha:", charName)
  print("Player ID:", inGameId)
  print("Character Name:", charName)
end

Citizen.CreateThread(function()
  SpawnDeliveryManager()
  SpawnDeliveryVehicules()
  local blip = createDeliveryBlip(-396.14, -2775.92, 6.0, "Delivery Job")
  test()
  exports.ox_target:addLocalEntity(deliveryManagerPed, {
    label = 'Start Delivery Job',
    name = 'deliveryJob',
    icon = 'fa-solid fa-truck-fast',

    onSelect = function()
        toggleNuiFrame(true)
    end
  })
  exports.ox_target:addLocalEntity(deliveryManagerPed, {
    label = 'Claim Money',
    name = 'Claim Button',
    icon = 'fa-solid fa-money-bill-transfer',

    onSelect = function()
        TriggerServerEvent('qb-delivery:server:PayPlayer' )
    end
  })

  -- local deliveryVehicleHash = SpawnPedInVehicule()
  -- print("deliveryVehicleHash :", deliveryVehicleHash)
end)



triggerBoxAnimation = function()
  lib.requestAnimDict("anim@heists@box_carry@")
  TaskPlayAnim(cache.ped, "anim@heists@box_carry@", "idle", 8.0, -8.0, -1, 50, 0, false, false, false)
  lib.requestModel("prop_cs_cardbox_01")
  boxProp = CreateObject(`prop_cs_cardbox_01`, 0, 0, 0, true, true, false)
  AttachEntityToEntity(boxProp, cache.ped, GetPedBoneIndex(cache.ped, 28422), 0, -0.1, -0.2, 0.0, 0.0, 0.0, true, true, false, true, 1, true)
  animationOn = true
  return animationOn
end

clearBoxAnimation = function()
  ClearPedTasks(cache.ped)
  if boxProp then
    DetachEntity(boxProp, true, true)
    DeleteEntity(boxProp)
    boxProp = nil
  end
  animationOn = false
  return animationOn
end


-- Appel des fonctions via les commandes
RegisterCommand("box", function()
  triggerBoxAnimation()
end, false)

RegisterCommand("ox", function()
  clearBoxAnimation()
end, false)

RegisterNetEvent('qb-delivery:client:Start')
AddEventHandler('qb-delivery:client:Start', function()
  SpawnPedInVehicule()
  print("Start Event")
end)

RegisterNUICallback('getPlayerStats', function(data, cb)
  local playerStats = {
    {
      startAddress = "4656 West Wood",
      startAdressZip = "Los Santos 24562",
      deliveryAddress = "2378 Grase",
      deliveryAdressZip = "Los Santos 4362",
      name = "Artemis Dev Team",
      status = "In transit",
      dailyDeliveryNb = 4,
      progression = 75
    }
  }
  cb(playerStats)
end)

RegisterNUICallback('connectedPlayers', function(data, cb)
  local playerStats = {    
      { id = 1, playerState = "Ready", time = "00:00:00", image = profilepic, image2 = logoGoMini },
      { id = 2, playerState = "Ready", time = "01:22:20", image = profilepic, image2 = logoGoMini },
      { id = 3, playerState = "lobby", time = "01:22:20", image = profilepic, image2 = logoGoMini },
      { id = 3, playerState = "lobby", time = "01:22:20", image = profilepic, image2 = logoGoMini },
      { id = 3, playerState = "AFK", time = "01:22:20", image = profilepic, image2 = logoGoMini },
      { id = 3, playerState = "lobby", time = "01:22:20", image = profilepic, image2 = logoGoMini },
    }
  cb(playerStats)
end)

-- ========================= Lobby =========================
RegisterNetEvent('qb-delivery:client:CreateLobby')
AddEventHandler('qb-delivery:client:CreateLobby', function(lobbyname)
  TriggerServerEvent('qb-delivery:client:CreateLobby', lobbyname)
end)

RegisterNetEvent('qb-delivery:client:JoinLobby')
AddEventHandler('qb-delivery:client:JoinLobby', function(lobbyId)
  TriggerServerEvent('qb-delivery:client:JoinLobby', lobbyId)
end)

RegisterNetEvent('qb-delivery:client:LeaveLobby')
AddEventHandler('qb-delivery:client:LeaveLobby', function()
  TriggerServerEvent('qb-delivery:client:LeaveLobby')
end)




-- ========================= Show UI =========================
RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNuiCallback('Start', function(data, cb)
  toggleNuiFrame(false)
  Citizen.Wait(100)
  -- pense ici a ajouter une cinematique 
  SpawnPedInVehicule()
  cb({})
end)



-- ========================== Ressources ==========================
AddEventHandler('onResourceStart', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
      return    
  end
  DeleteEntity(deliveryManagerPed)
  DeleteEntity(notepad)
  DeleteEntity(deliveryVehicleHash)
end)

AddEventHandler('onResourceStop', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
      return
  end
end)