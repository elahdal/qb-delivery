local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config
local deliveryManagerPed
local notepad

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function DeleteEntities()
  if DoesEntityExist(deliveryManagerPed) then
    DeleteEntity(deliveryManagerPed)
  end
  if DoesEntityExist(notepad) then
    DeleteEntity(notepad)
  end
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

Citizen.CreateThread(function()
  SpawnBoss()
  SpawnVehicules()

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