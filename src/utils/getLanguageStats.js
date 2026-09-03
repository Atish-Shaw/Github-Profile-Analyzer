export function getLanguageStats(repo){

    const langCount={};

    for(const r of repo){

        if(r.language){

            langCount[r.language]=
            (langCount[r.language]||0)+1;

        }

    }

    return langCount;

}