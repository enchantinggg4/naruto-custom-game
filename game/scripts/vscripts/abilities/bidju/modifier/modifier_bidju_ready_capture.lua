--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
Modifier_Bidju_Ready_Capture = Modifier_Bidju_Ready_Capture or {};
Modifier_Bidju_Ready_Capture.__index = Modifier_Bidju_Ready_Capture;
Modifier_Bidju_Ready_Capture.new = function(construct, ...)
    local self = setmetatable({}, Modifier_Bidju_Ready_Capture);
    if construct and Modifier_Bidju_Ready_Capture.constructor then
        Modifier_Bidju_Ready_Capture.constructor(self, ...);
    end
    return self;
end;
Modifier_Bidju_Ready_Capture.constructor = function(self)
end;
Modifier_Bidju_Ready_Capture.IsStunDebuff = function(self)
    return false;
end;
Modifier_Bidju_Ready_Capture.IsHidden = function(self)
    return false;
end;
Modifier_Bidju_Ready_Capture.GetDuration = function(self)
    return 10000000;
end;
Modifier_Bidju_Ready_Capture.IsPurgable = function(self)
    return false;
end;
