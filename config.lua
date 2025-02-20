--      _____          __                 .__         ________                
--     /  _  \________/  |_  ____   _____ |__| ______ \______ \   _______  __ 
--    /  /_\  \_  __ \   __\/ __ \ /     \|  |/  ___/  |    |  \_/ __ \  \/ / 
--   /    |    \  | \/|  | \  ___/|  Y Y  \  |\___ \   |    `   \  ___/\   /  
--   \____|__  /__|   |__|  \___  >__|_|  /__/____  > /_______  /\___  >\_/   
--           \/                 \/      \/        \/          \/     \/             V1.0 © 2025 by l7ardoun



Config = {}
Config.Debug = true
Config.Notification = 'ox'
Config.Progress = 'ox'

Config.DeliveryPayment = {
    wagePerDelivery = 500,
    CompensationIfMissionCompleted = 3000
}

Config.DeliveryManagerPed = {
    model = `s_m_m_dockwork_01`,  -- Using backticks for proper model hash
    coords = vec4(-424.33, -2789.82, 5.53, 317.1),    -- Exemple de coordonnées
    propModel = `prop_fib_clipboard`,
}

Config.DeliveryVehicles = {
    {model = 4061868990, coords = vec4(-411.44, -2791.08, 5.0, 314.6)},    -- Exemple de coordonnées
    {model = 4061868990, coords = vec4(-405.75, -2795.4, 5.0, 311.85)}    -- Exemple de coordonnées
}

Config.DeliveryPlayerVehicle = {
    model = 4061868990, coords = vec4(-400.41, -2784.41, 5.0, 309.59)
}

Config.DeliveryAdresses = {
    {coords = vector3(-1225.49, -1208.03, 8.27), label = "Bay City Avenue", ZipCode = "Los Santos 424"},
    {coords = vector3(-12.67, 6559.99, 31.97), label = "Paleto Boulevard", ZipCode = "Los Santos 424"},
    {coords = vector3(-64.31, -1449.56, 32.52), label = "Forum Drive", ZipCode = "Los Santos 562"},
    {coords = vector3(-149.81, 281.46, 93.76), label = "Eclipse Boulevard", ZipCode = "Los Santos 700"},
    {coords = vector3(-1476.75, 884.8, 182.89), label = "Marlowe Drive", ZipCode = "Los Santos 700"},
    {coords = vector3(-475.21, 585.93, 128.68), label = "Milton Road", ZipCode = "Los Santos 700"},
    {coords = vector3(-658.85, 897.68, 229.24), label = "Milton Road 2", ZipCode = "Los Santos 700"},
    {coords = vector3(-1685.08, -292.13, 51.89), label = "West Eclipse Boulevard", ZipCode = "Los Santos 700"},
    {coords = vector3(223.37, 514.02, 140.77), label = "Wild Oats Drive", ZipCode = "Los Santos 700"},
    {coords = vector3(1229.05, -725.46, 60.8), label = "Mirror Park Boulevard", ZipCode = "Los Santos 730"},
    {coords = vector3(1922.76, 3915.42, 32.57), label = "Marina Drive", ZipCode = "Los Santos 855"},
    {coords = vector3(1523.78, 2218.86, 76.9), label = "Senora Road", ZipCode = "Los Santos 855"},
    {coords = vector3(2632.74, 3258.57, 55.46), label = "Smoke Tree Road", ZipCode = "Los Santos 855"},
    {coords = vector3(-3238.03, 952.8, 13.24), label = "Barbareno Road", ZipCode = "Los Santos 999"},
    {coords = vector3(-3187.39, 1273.92, 12.67), label = "Barbareno Road 2", ZipCode = "Los Santos 999"},
    {coords = vector3(3800.86, 4475.19, 5.99), label = "Catfish View", ZipCode = "Los Santos 999"},
    {coords = vector3(-2976.92, 609.35, 20.25), label = "Inseno Road", ZipCode = "Los Santos 999"},
    {coords = vector3(-3089.4, 221.2, 14.12), label = "Inseno Road 2", ZipCode = "Los Santos 999"},
    {coords = vector3(2221.3, 5614.53, 54.87), label = "O'Neil Way", ZipCode = "Los Santos 999"},
    {coords = vector3(3325.95, 5165.81, 18.44), label = "Union Road", ZipCode = "Los Santos 999"},
}



-- Détecte automatiquement l'inventaire utilisé (ox_inventory ou qb-inventory)
AddEventHandler("onResourceStart", function(resourceName)
    if GetCurrentResourceName() == resourceName then
        Wait(2000)
        if GetResourceState('ox_inventory') == 'started' then
            Config.Inventory = 'ox'
        elseif GetResourceState('qb-inventory') == 'started' then
            Config.Inventory = 'qb'
        else
            print("Aucun inventaire compatible trouvé !")
        end
    end
end)