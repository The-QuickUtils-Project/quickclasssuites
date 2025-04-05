export function sortGroupsBypoint(groups: groups): { [key: string]: number } {
    // 1. 将对象转换为数组并按 point 降序排序
    const sortedGroups = Object.values(groups).sort((a, b) => b.point - a.point);
    
    // 2. 将排序后的数组转换为 { "组名": point } 格式的对象
    const result = sortedGroups.reduce((acc, group) => {
        acc[group.name] = group.point;
        return acc;
    }, {} as { [key: string]: number });

    return result;
}