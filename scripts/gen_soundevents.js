const Path = require("path");
const fs = require("fs");

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function GenerateSoundsEvents(directory, root){
	const abilityName = Path.basename(directory);
	console.log(abilityName);
	const files = fs.readdirSync(directory);
	const actions = files.map(it => it.split(".")[0])

	const relativePath = Path.relative(root, directory).replaceAll(/\\/, "/");

	const generatedCode = actions.map(name => {
		return `
"${abilityName}.${name}"
{
    "operator_stacks"
    {
        "update_stack"
        {
            "reference_operator"
            {
                "operator"              "sos_reference_stack"
                "reference_stack"       "dota_update_default"
                "operator_variables"
                {
                    "vsnd_files"
                    {
                        "value"
                        {
                              "value0"        "${relativePath}/${name}.vsnd"
                        }
                    }
                    "volume"            {   "value"     "3.00000"  }
                    "pitch_rand_min"    {   "value"     "-0.05000"  }
                    "pitch_rand_max"    {   "value"     "0.050000"  }
                    "pitch"             {   "value"     "1.000000"  }
                    "soundlevel"        {   "value"     "100.00000" }
                    "distance_max"      {   "value"     "1600.000"  }
                    "event_type"        {   "value"     "1.000000"  }
                }
            }
        }
    }
}
		`
	}).join("");

	const genEnumItems = actions.map(name => {
		return `\t${name} = "${abilityName}.${name}"`
	}).join(", \n");

	const generatedEnum = `
export enum Sound_${abilityName} {
${genEnumItems}
}	
	`;


	return {
		code: generatedCode,
		fileName: `game_sounds_${abilityName}.vsndevts`,
		enum: generatedEnum
	}
}


function GenerateFiles(){
	const files = fs.readdirSync("content/sounds/abilities");

	const enums = files.map(abilityName => {
		const abilityFullPath = Path.join(__dirname, "../content/sounds/abilities", abilityName);
		const data = GenerateSoundsEvents(abilityFullPath, Path.join(__dirname, "content/sounds"));
		const soundevents = Path.join(__dirname, "../content/soundevents", data.fileName);
		fs.writeFileSync(soundevents, data.code);
		return data.enum
	}).join("\n");

	fs.writeFileSync("src/vscripts/Sounds.ts", enums);
}


GenerateFiles();