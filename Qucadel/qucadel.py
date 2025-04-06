import os, sys, json
argvs = sys.argv
AppDataPath = os.path.expandvars('%APPDATA%')
AppDataPath = os.path.join(AppDataPath, "classhub", "storage")


def createConfig():
    """
    创建 config.json 文件，并保存用户输入的路径
    """
    # 定义 config.json 文件路径
    configPath = os.path.join(AppDataPath, "config.json")

    # 获取用户输入的路径
    print("请输入存储路径:")
    storagePath = input("> ").strip()

    # 确保路径存在
    if not os.path.exists(storagePath):
        print(f"路径 {storagePath} 不存在，是否创建？(y/n)")
        confirm = input("> ").strip().lower()
        if confirm == "y":
            os.makedirs(storagePath, exist_ok=True)
            print(f"路径 {storagePath} 已创建")
        else:
            print("操作已取消")
            return

    # 保存到 config.json 文件
    configData = {"archievePath": storagePath}
    with open(configPath, "w", encoding="utf-8") as f:
        json.dump(configData, f, ensure_ascii=False, indent=4)

    print(f"配置文件已创建: {configPath}")

def addStudent(params: str):
    """
    添加学生
    :param params: 学生信息
    :return: None
    """
    # 从 config.json 中读取 archievePath
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 classinfo.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "classinfo.json")

    # 解析学生信息
    params = params.split(" ")
    if len(params) != 3:
        print("参数错误，格式: 姓名 小组 AvatarURL")
        return
    name = params[0]
    group = params[1]
    avatar = params[2]

    # 确保路径存在
    os.makedirs(os.path.dirname(filePath), exist_ok=True)

    # 读取或初始化 classinfo.json
    if os.path.exists(filePath):
        with open(filePath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print("classinfo.json 文件格式错误，已重置")
                data = {"students": {}, "groups": {}}
    else:
        data = {"students": {}, "groups": {}}

    # 获取新的学生 ID
    student_id = str(len(data["students"]) + 1)

    # 检查小组是否存在
    if group not in data["groups"].keys():
        print(f"小组 {group} 不存在，请先创建小组")
        return

    # 添加学生信息
    data["students"][student_id] = {
        "name": name,
        "group": group,
        "avatar": avatar
    }

    # 更新小组的学生列表
    if "students" not in data["groups"][group]:
        data["groups"][group]["students"] = []
    data["groups"][group]["students"].append(student_id)

    # 写回 classinfo.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"学生 {name} 已成功添加到小组 {group}")

def addGroup(params: str):
    """
    添加小组
    :param params: 小组信息
    :return: None
    """
    # 从 config.json 中读取 archievePath
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先运行 init 模式创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 classinfo.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "classinfo.json")

    # 解析小组信息
    params = params.split(" ")
    if len(params) != 3:
        print("参数错误")
        return
    group_id = params[1]
    group_name = params[0]
    group_points = int(params[2])

    # 确保路径存在
    os.makedirs(os.path.dirname(filePath), exist_ok=True)

    # 读取或初始化 classinfo.json
    if os.path.exists(filePath):
        with open(filePath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print("classinfo.json 文件格式错误，已重置")
                data = {"students": {}, "groups": {}}
    else:
        data = {"students": {}, "groups": {}}

    # 检查小组是否已存在
    if group_id in data.get("groups", {}):
        print(f"小组 {group_id} 已存在，名称为 {data['groups'][group_id]['name']}")
        return

    # 添加小组信息
    data["groups"][group_id] = {
        "name": group_name,
        "point": group_points,
        "students": []
    }

    # 写回 classinfo.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"小组 {group_name} (ID: {group_id}) 已成功添加")

def addNotice(params: str):
    """
    添加通知
    :param params: 通知信息
    :return: None
    """
    # 从 config.json 中读取 archievePath
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先运行 init 模式创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 noticeboard.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "noticeboard.json")

    # 解析通知信息
    params = params.split(" ", 3)
    if len(params) != 4:
        print("参数错误")
        print("格式: 标题 内容 日期 是否置顶(true/false)")
        return
    title = params[0]
    content = params[1]
    date = params[2]
    isPinned = params[3].lower() == "true"

    # 确保路径存在
    os.makedirs(os.path.dirname(filePath), exist_ok=True)

    # 读取或初始化 noticeboard.json
    if os.path.exists(filePath):
        with open(filePath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print("noticeboard.json 文件格式错误，已重置")
                data = {}
    else:
        data = {}

    # 获取新的通知 ID
    notice_id = str(len(data) + 1)

    # 添加通知信息
    data[notice_id] = {
        "title": title,
        "content": content,
        "date": date,
        "isPinned": isPinned
    }

    # 写回 noticeboard.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"通知 '{title}' 已成功添加")

def deleteStudent(student_id: str):
    """
    删除学生
    :param student_id: 学生 ID
    :return: None
    """
    # 从 config.json 中读取 archievePath
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先运行 init 模式创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 classinfo.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "classinfo.json")

    # 检查文件是否存在
    if not os.path.exists(filePath):
        print("classinfo.json 文件不存在")
        return

    # 读取 classinfo.json
    with open(filePath, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            print("classinfo.json 文件格式错误")
            return

    # 检查学生是否存在
    if student_id not in data.get("students", {}):
        print(f"学生 ID {student_id} 不存在")
        return

    # 删除学生信息
    student = data["students"].pop(student_id)
    group_id = student["group"]

    # 从小组中移除学生
    if group_id in data["groups"] and student_id in data["groups"][group_id]["students"]:
        data["groups"][group_id]["students"].remove(student_id)

    # 写回 classinfo.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"学生 ID {student_id} 已成功删除")

def deleteGroup(group_id: str):
    """
    删除小组
    :param group_id: 小组 ID
    :return: None
    """
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先运行 init 模式创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 classinfo.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "classinfo.json")

    # 检查文件是否存在
    if not os.path.exists(filePath):
        print("classinfo.json 文件不存在")
        return

    # 读取 classinfo.json
    with open(filePath, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            print("classinfo.json 文件格式错误")
            return

    # 检查小组是否存在
    if group_id not in data.get("groups", {}):
        print(f"小组 ID {group_id} 不存在")
        return

    # 删除小组信息
    group = data["groups"].pop(group_id)

    # 删除小组中的所有学生
    for student_id in group["students"]:
        if student_id in data["students"]:
            data["students"].pop(student_id)

    # 写回 classinfo.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"小组 ID {group_id} 已成功删除")

def deleteNotice(notice_id: str):
    """
    删除通知
    :param notice_id: 通知 ID
    :return: None
    """
    # 从 config.json 中读取 archievePath
    configPath = os.path.join(AppDataPath, "config.json")
    if not os.path.exists(configPath):
        print("配置文件 config.json 不存在，请先运行 init 模式创建配置文件")
        return

    with open(configPath, "r", encoding="utf-8") as f:
        try:
            config = json.load(f)
        except json.JSONDecodeError:
            print("配置文件 config.json 格式错误")
            return

    archievePath = config.get("archievePath")
    if not archievePath:
        print("配置文件中未找到 archievePath，请检查配置文件")
        return

    # 定义 noticeboard.json 的路径
    filePath = os.path.join(archievePath, "QuickClass", "Archieve", "noticeboard.json")

    # 检查文件是否存在
    if not os.path.exists(filePath):
        print("noticeboard.json 文件不存在")
        return

    # 读取 noticeboard.json
    with open(filePath, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            print("noticeboard.json 文件格式错误")
            return

    # 检查通知是否存在
    if notice_id not in data:
        print(f"通知 ID {notice_id} 不存在")
        return

    # 删除通知信息
    data.pop(notice_id)

    # 写回 noticeboard.json
    with open(filePath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"通知 ID {notice_id} 已成功删除")

if len(argvs) != 2:
    print("参数错误")
    print("用法: qucadel.exe <数据模式> \n 数据模式: student, notice, group, delete")
    exit(1)
print("QuickClass 数据编辑器(轻量版) by 2minRain")
mode = argvs[1]
if mode != "student" and mode != "group" and mode != "notice" and mode != "delete" and mode != "init":
    print("数据模式错误")
    print("数据模式: student, notice, group, delete")
    exit(1)

if mode == "student":
    print("数据模式: 学生信息")
    print("若还没有创建小组, 请先创建小组")
    while True:
        print("请输入要添加的学生信息(格式: 姓名 小组 AvatarURL):")
        params = input("> ")
        if params == "exit":
            break
        addStudent(params)

elif mode == "group":
    print("数据模式: 小组信息")
    while True:
        print("请输入要添加的小组信息[格式: 小组名称, 小组ID(最好填写, 否则后续版本更新可能生成UUID, 影响添加学生), 初始积分值(如有, 适用于迁移至QuickClass的用户)]:")
        params = input("> ")
        if params == "exit":
            break
        addGroup(params)

elif mode == "notice":
    print("数据模式: 通知信息")
    while True:
        print("请输入要添加的通知信息(格式: 标题 内容 日期 是否置顶(true/false)):")
        params = input("> ")
        if params == "exit":
            break
        addNotice(params)

elif mode == "delete":
    print("数据模式: 删除数据")
    while True:
        print("请输入要删除的数据类型(格式: 类型 ID，例如 student 1 或 group 4 或 notice 1):")
        params = input("> ")
        if params == "exit":
            break
        args = params.split(" ")
        if len(args) != 2:
            print("参数错误，格式: 类型 ID")
            continue
        data_type, data_id = args
        if data_type == "student":
            deleteStudent(data_id)
        elif data_type == "group":
            deleteGroup(data_id)
        elif data_type == "notice":
            deleteNotice(data_id)
        else:
            print("未知的数据类型，支持类型: student, group, notice")
elif mode == "init":
    createConfig()