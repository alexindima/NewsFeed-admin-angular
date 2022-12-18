// Некорректное название файла. Этот файл содержит правила валидации, можешь назвать что-то типа custom valid rules
export const validUserName = new RegExp('^[a-zA-Z0-9_]{3,}$'); // IDE подсказывает "'[a-zA-Z0-9_]' can be simplified to '\w' "
export const validPassword = new RegExp('^[a-zA-Z0-9:;!#$%^&*()_=+]{6,}$');
