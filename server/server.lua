local QBCore = exports['qb-core']:GetCoreObject()
local cfg = Config
local lobbies = {}

RegisterNetEvent('qb-delivery:server:PayPlayer')
AddEventHandler('qb-delivery:server:PayPlayer', function()
    local src = source
    -- print("[DEBUG] PayPlayer event triggered by source: " .. tostring(src))
    local Player = QBCore.Functions.GetPlayer(src)
    local citizenid = Player.PlayerData.citizenid
    -- print("[DEBUG] Fetching payment for citizenid: " .. tostring(citizenid))
    
    exports.oxmysql:fetch("SELECT payment_amount FROM delivery_data WHERE player_id = ?", { citizenid }, function(result)
        local payment = 0
        if result and result[1] and result[1].payment_amount then
            payment = result[1].payment_amount
        end
        
        print("[DEBUG] Payment fetched: " .. tostring(payment))
        
        if payment then
            Player.Functions.AddMoney('cash', payment)
            -- print("[DEBUG] Added money (" .. tostring(payment) .. ") to player with citizenid: " .. tostring(citizenid))
            TriggerClientEvent('QBCore:Notify', src, 'Vous avez reçu ' .. payment .. '$', 'success')
            exports.oxmysql:execute("UPDATE delivery_data SET payment_amount = 0 WHERE player_id = ?", { citizenid }, function(affectedRows)
                -- print("[DEBUG] Payment reset in DB. Affected rows: " .. tostring(affectedRows))
            end)
        else
            -- print("[DEBUG] No payment available for citizenid: " .. tostring(citizenid))
            TriggerClientEvent('QBCore:Notify', src, "Aucun paiement disponible.", "error")
        end
    end)
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

RegisterNetEvent('qb-delivery:server:CreateLobby')
AddEventHandler('qb-delivery:server:CreateLobby', function(lobbyname)
    print("Event dbug triggered S...")

    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local lobbyId = #lobbies + 1
    lobbies[lobbyId] = {
        name = lobbyname,
        players = {[src] = Player},
        active = false
    }
    print("Lobby Created succesfully!")
end)

RegisterNetEvent('qb-delivery:server:JoinLobby')
AddEventHandler('qb-delivery:server:JoinLobby', function(lobbyId)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local name = Player
    print("Join OUT")
    if lobbies[lobbyId] then
        lobbies[lobbyId].players[src] = Player
        print("Welcome player to lobby named" ,lobbies[lobbyId].name, "players =" ,lobbies[lobbyId].players,"state : ",lobbies[lobbyId].active)
    else
        print("error join: lobby not found")
    end
end)

RegisterNetEvent('qb-delivery:server:LeaveLobby')
AddEventHandler('qb-delivery:server:LeaveLobby', function()
    local src = source
    for lobbyId, lobbyBoucle in pairs(lobbies) do
        if lobbyBoucle.players[src] then
            lobbyBoucle.players[src] = nil
            print("Joueur quitté du lobby ID:", lobbyId)
            break
        end
    end
end)

RegisterNetEvent('qb-delivery:server:dbug')
AddEventHandler('qb-delivery:server:dbug',function()
    print("Start dbuggin S ...")
    print("Number of lobbies:", #lobbies)
    if next(lobbies) == nil then
        print("Lobbies table is empty!")
        return
    end
    for lobbyId, lobbyBoucle in pairs(lobbies) do
        print("IN")
        print("dbug lobby ID:", lobbyId) 
        print("lobby name:", lobbyBoucle.name)
        print("lobby active:", lobbyBoucle.active)
        for playerId, playerData in pairs(lobbyBoucle.players) do
            print("player ", playerData.PlayerData.charinfo.firstname .. " " .. playerData.PlayerData.charinfo.lastname)
        end
    end
end)