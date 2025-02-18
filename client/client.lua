local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config
local deliveryManagerPed
local notepad

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function SpawnBoss()
  local model = cfg.DeliveryManagerPed.model
  local propModel = cfg.DeliveryManagerPed.propModel
  
  print("[DEBUG] Demande de chargement du modèle Ped et Notepad")
  RequestModel(model)
  RequestModel(propModel)
  
  while not HasModelLoaded(model) do
      Wait(100)
  end
  
  while not HasModelLoaded(propModel) do
      Wait(100)
  end
  
  print("[DEBUG] Modèles chargés avec succès")

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

local function SpawnVehicules()
  for _, vehicleInfo in ipairs(cfg.DeliveryVehicles) do
    local model = vehicleInfo.model
    RequestModel(model)
    while not HasModelLoaded(model) do
      Wait(10)
    end

    local vehicle = CreateVehicle(model, vehicleInfo.coords.x, vehicleInfo.coords.y, vehicleInfo.coords.z, vehicleInfo.coords.w, false, false)
    print("[DEBUG] Véhicule créé avec succès")
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
  local distances = {}
  for _, deliveryAdresses in pairs(dataAdress) do
    print("[DEBUG: GetNearestAdress] Adresses: " .. deliveryAdresses.label)

    local playerCoords = GetEntityCoords(PlayerPedId())
    local vehicleCoords = vector3(deliveryAdresses.coords.x, deliveryAdresses.coords.y, deliveryAdresses.coords.z)
    local distance = #(playerCoords - vehicleCoords)
    print("[DEBUG: GetNearestAdress] Distance to vehicle: " .. distance)
    table.insert(distances, {
      coords = vector3(deliveryAdresses.coords.x, deliveryAdresses.coords.y, deliveryAdresses.coords.z),
      label = deliveryAdresses.label,
      distance = distance
    })
    -- Sort the distances table based on distance
    table.sort(distances, function(a, b)
      return a.distance < b.distance
    end)
  end
  return distances
end

-- Nouvelle fonction pour attendre l'arrivée du joueur
local function CheckForArrival(destination, destinationBlip)
  local arrived = false
  -- Start timer for the delivery mission
  local deliveryStartTime = GetGameTimer() -- Ce temps est en millisecondes (ms). Pour l'obtenir en secondes, divisez la valeur par 1000.
  local deliveryTime
  while not arrived do
    Wait(500)
    local playerCoords = GetEntityCoords(PlayerPedId())
    if #(playerCoords - vector3(destination.x, destination.y, destination.z)) < 5.0 then
      deliveryTime = GetGameTimer() - deliveryStartTime
      print("[DEBUG: CheckForArrival] Delivery time: " .. deliveryTime/1000)
      RemoveBlip(destinationBlip)
      QBCore.Functions.Notify('You have arrived at your destination!', 'success', 5000)
      TriggerServerEvent('qb-delivery:server:PayPlayer', cfg.DeliveryPayment.wagePerDelivery)
      TriggerServerEvent('qb-delivery:server:UpdateDB', 9999)
      arrived = true
    end
  end
  return deliveryTime/1000
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
      TriggerServerEvent('qb-delivery:server:PayPlayer', cfg.DeliveryPayment.CompensationIfMissionCompleted)
    else
      QBCore.Functions.Notify('You have failed the delivery!', 'error', 5000)
    end
    -- /!\ On rentre dans une boucle donc vaut mieux faire la boucle checkifArrived dans un thread
  end

  SetModelAsNoLongerNeeded(model)
  -- si en mode multijoueur utiliser ce vehicule pur placer les joueurs
  return vehicle
end

Citizen.CreateThread(function()
  SpawnBoss()
  SpawnVehicules()
  local deliveryVehicleHash = SpawnPedInVehicule()
  print("deliveryVehicleHash :", deliveryVehicleHash)

  exports.ox_target:addLocalEntity(deliveryManagerPed, {
    label = 'Start Delivery Job',
    name = 'deliveryJob',
    icon = 'fa-solid fa-truck-fast',

    onSelect = function()
        toggleNuiFrame(true)
    end
  })

  exports.ox_target:addLocalEntity(notepad, {
    label = 'Start Delivery Job',
    name = 'deliveryJob',
    icon = 'fa-solid fa-truck-fast',

    onSelect = function()
        toggleNuiFrame(true)
    end

})
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




-- ========================== Ressources ==========================
AddEventHandler('onResourceStart', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
      return     
  end
end)

AddEventHandler('onResourceStop', function(resourceName)
  if (GetCurrentResourceName() ~= resourceName) then
      return
  end
end)