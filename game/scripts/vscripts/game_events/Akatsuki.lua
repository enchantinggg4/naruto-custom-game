--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
local exports = exports or {};
exports.AkatsukiManager = exports.AkatsukiManager or {};
exports.AkatsukiManager.__index = exports.AkatsukiManager;
exports.AkatsukiManager.new = function(construct, ...)
    local self = setmetatable({}, exports.AkatsukiManager);
    if construct and exports.AkatsukiManager.constructor then
        exports.AkatsukiManager.constructor(self, ...);
    end
    return self;
end;
exports.AkatsukiManager.constructor = function(self)
end;
exports.AkatsukiManager.IsAkatsuki = function(self, unit)
    return unit:GetTeam() == DOTA_TEAM_BADGUYS;
end;
exports.AkatsukiManager.OnBidjuCaptured = function(self, killedBidju)
    exports.AkatsukiManager:createParticleIndicator(killedBidju);
    exports.AkatsukiManager:createDefender(killedBidju);
    if killedBidju.owner then
        DebugPrint("capture this shit!");
    end
end;
exports.AkatsukiManager.createParticleIndicator = function(self, killedBidju)
    local targetEntity = Entities:FindByName(nil, "akatsuki_preview_" .. (tostring(killedBidju:GetUnitName()) .. ""));
    if targetEntity.bidjuIndicatorParticle then
        ParticleManager:DestroyParticle(targetEntity.bidjuIndicatorParticle, false);
    end
    targetEntity.bidjuIndicatorParticle = ParticleManager:CreateParticle("particles/env/bidju_capture_indicator.vpcf", PATTACH_ABSORIGIN, targetEntity);
    ParticleManager:SetParticleControlEnt(targetEntity.bidjuIndicatorParticle, 0, targetEntity, PATTACH_ABSORIGIN, "attach_hitloc", targetEntity:GetAbsOrigin(), true);
end;
exports.AkatsukiManager.removeParticleIndicator = function(self, killedBidjuName)
    local targetEntity = Entities:FindByName(nil, "akatsuki_preview_" .. (tostring(killedBidjuName) .. ""));
    if targetEntity.bidjuIndicatorParticle then
        ParticleManager:DestroyParticle(targetEntity.bidjuIndicatorParticle, false);
    end
end;
exports.AkatsukiManager.createDefender = function(self, killedBidju)
    local entity = Entities:FindByName(nil, "akatsuki_preview_" .. (tostring(killedBidju:GetUnitName()) .. ""));
    local unit = CreateUnitByName("npc_dota_custom_cave", entity:GetAbsOrigin(), true, nil, nil, DOTA_TEAM_BADGUYS);
    unit.bidjuName = killedBidju:GetUnitName();
    if killedBidju.owner then
        killedBidju.owner:onLoseBidju();
    end
end;
return exports;
