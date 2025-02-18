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

Config.DeliveryVehicle = {
    model = `phantom`,  -- Using backticks for proper model hash
    coords = vec4(-424.33, -2789.82, 5.53, 317.1),    -- Exemple de coordonnées
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