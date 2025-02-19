local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config

RegisterNetEvent('qb-delivery:server:PayPlayer')
AddEventHandler('qb-delivery:server:PayPlayer', function(amountToPay)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    Player.Functions.AddMoney('cash', amountToPay)
    TriggerClientEvent('QBCore:Notify', src, 'Vous avez reçu ' .. cfg.DeliveryPayment.CompensationIfMissionCompleted .. '$', 'success')
end)

RegisterNetEvent('qb-delivery:server:StoreInDB')
AddEventHandler('qb-delivery:server:StoreInDB', function()
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local citizenid = Player.PlayerData.citizenid
    local result = exports.oxmysql:fetchSync("SELECT 1 FROM delivery_data WHERE player_id = ?", { citizenid })
    if not result[1] then
        exports.oxmysql:insert("INSERT IGNORE INTO delivery_data (player_id, payment_amount) VALUES (?, ?)", { citizenid, 0 })
    end
end)

RegisterNetEvent('qb-delivery:server:UpdateDB')
AddEventHandler('qb-delivery:server:UpdateDB', function(bonus)
    local src = source
    print("[DEBUG] qb-delivery:server:UpdateDB called by source: " .. tostring(src))
    local Player = QBCore.Functions.GetPlayer(src)
    if not Player then
        print("[DEBUG] No player found for source: " .. tostring(src))
        return
    end
    local citizenid = Player.PlayerData.citizenid
    print("[DEBUG] Updating DB for citizenid: " .. tostring(citizenid) .. " with bonus: " .. tostring(bonus))
    
    exports.oxmysql:fetch("SELECT payment_amount FROM delivery_data WHERE player_id = ?", { citizenid }, function(result)
        local currentPayment = 0
        if result and result[1] and result[1].payment_amount then
            currentPayment = result[1].payment_amount
        end
        local newPayment = currentPayment + bonus
        exports.oxmysql:execute([[
            UPDATE delivery_data
            SET payment_amount = ?
            WHERE player_id = ?
        ]], { newPayment, citizenid }, function(affectedRows)
            print("[DEBUG] Database update executed. Affected rows: " .. tostring(affectedRows))
        end)
    end)
end)
