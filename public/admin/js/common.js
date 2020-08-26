function serializeToJson(form) {
    var result = {};
    // [{name: 'email', value: '用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item) {
        // result.email  方括号和.都能用来为对象添加属性
        result[item.name] = item.value;
    });
    return result;
}