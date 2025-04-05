export default function sortCredit(groupsInfo: groups): groups {
    const sortedGroups = Object.entries(groupsInfo).sort((a, b) => {
        return b[1].credit - a[1].credit;
    });
    const sortedGroupsObj: groups = Object.fromEntries(sortedGroups);
    return sortedGroupsObj;
}