const LOCAL_KEY = "todomvc";

/**
 * 获取目前所有的任务
 * */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}

/**
 * 保存所有的任务
 * */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 生成一个任务的唯一编号（时间戳+4位随机数）
 */
export function generateId() {
  return Date.now() + Math.random().toString(16).substring(2, 4); //将随机数转为16进制，然后截取小数点后面的4位。
}

export function filterFn(todos, visibility) {
  if (visibility === "all") {
    return todos;
  } else if (visibility === "active") {
    return todos.filter((item) => !item.completed);
  } else if (visibility === "completed") {
    return todos.filter((item) => item.completed);
  }

  throw new Error("invalid visibility value");
}
