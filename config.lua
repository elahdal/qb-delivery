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
    {coords = vec4(1922.76, 3915.42, 32.57, 325.24), label = "Adresse 1"},    -- Exemple de coordonnées
    {coords = vec4(-405.75, -2795.4, 5.0, 311.85), label = "Adresse 2"},    -- Exemple de coordonnées
    {coords = vec4(1922.76, 3915.42, 32.57, 325.24), label = "Adresse 3"},    -- Exemple de coordonnées

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