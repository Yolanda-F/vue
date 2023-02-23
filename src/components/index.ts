//对搜索字段高亮
export const highlightWord = (searchText: string, value: string) => {
  //如果包含搜索内容
  if (searchText && value.indexOf(searchText) != -1) {
    return value.replaceAll(
      searchText,
      `<span class="highlight-text">${searchText}</span>`
    );
  } else {
    value = value.replaceAll(`<span class="highlight-text">`, "");
    value = value.replaceAll(`</span>`, "");
    return value;
  }
};
