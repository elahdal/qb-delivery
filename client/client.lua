local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config
local deliveryManagerPed

local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function SpawnBoss()
  local model = cfg.DeliveryManagerPed.model  -- Récupérer le hash du modèle
  local propModel = cfg.DeliveryManagerPed.propModel  -- Récupérer le hash du modèle
  
  print("[DEBUG] Demande de chargement du modèle Ped et Notepad")
  RequestModel(model)
  RequestModel(propModel)
  
  while not HasModelLoaded(model) do
      Wait(100)
      print("[DEBUG] En attente du chargement du modèle Ped...")
  end
  
  while not HasModelLoaded(propModel) do
      Wait(100)
      print("[DEBUG] En attente du chargement du modèle Notepad...")
  end
  
  print("[DEBUG] Modèles chargés avec succès")
  
  -- Création du Ped
  deliveryManagerPed = CreatePed(0, model, cfg.DeliveryManagerPed.coords.x, cfg.DeliveryManagerPed.coords.y, cfg.DeliveryManagerPed.coords.z, cfg.DeliveryManagerPed.coords.w, false, false)
  if deliveryManagerPed then
      print("[DEBUG] Ped créé avec succès")
  else
      print("[ERROR] Échec de la création du Ped")
      return
  end
  
  -- Création de l'objet (Notepad)
  local notepad = CreateObject(propModel, cfg.DeliveryManagerPed.coords.x, cfg.DeliveryManagerPed.coords.y, cfg.DeliveryManagerPed.coords.z, true, true, false)
  if notepad then
      print("[DEBUG] Notepad créé avec succès")
  else
      print("[ERROR] Échec de la création du Notepad")
      return
  end
  
  -- Vérification du Bone Index
  local boneIndex = GetPedBoneIndex(deliveryManagerPed, 36029)
  print("[DEBUG] Bone Index récupéré: ", boneIndex)
  
  -- Attachement de l'objet au Ped
  AttachEntityToEntity(notepad, deliveryManagerPed, boneIndex, 0.1, 0.0, 0.1, 255.0, 300.0, 0.0, true, true, false, true, 1, true)
  print("[DEBUG] Notepad attaché au Ped")
  
  -- Configuration du Ped
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
  print("[DEBUG] Animation chargée avec succès")
  
  TaskPlayAnim(deliveryManagerPed, animDict, "base", 8.0, -8.0, -1, 1, 0, false, false, false)
  print("[DEBUG] Animation jouée")
end

local function SpawnVehicules()
  for _, vehicleInfo in ipairs(cfg.DeliveryVehicle) do
    local model = 4061868990
    RequestModel(model)
    
  
    
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

CreateThread(function()
  SpawnBoss()
  SpawnVehicules()
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