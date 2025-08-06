export function getGrade(grades:any): string {
    if (!grades) 
        return "N/A";
    return(
        grades.yds ||
        grades.french ||
        grades.vscale ||
        grades.font ||
        grades.uiaa ||
        grades.ewbank ||
        grades.brazilianCrux ||
        grades.wi ||
        "N/A"
    )
}

export function getGradeType(type:any): string[] {
    if (!type)
        return [];
    return( [
        type.aid && "Aid",
        type.alpine && "Alpine",
        type.bouldering && "Bouldering",
        type.deepwatersolo && "Deep Water Solo",
        type.ice && "Ice",
        type.mixed && "Mixed",
        type.snow && "Snow",
        type.sport && "Sport",
        type.tr && "Top Rope",
        type.trad && "Trad"
        ].filter(Boolean) as string[]
    );
}