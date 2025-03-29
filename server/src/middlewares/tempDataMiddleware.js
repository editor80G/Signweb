// export const tempData = (req, res, next) => {
//     // Добавляет метод `setError` в объект `res`, чтобы можно было установить сообщение об ошибке
//     res.setError = (message) => {
//         req.session.error = {
//             message, // Сообщение об ошибке
//             isFirstRequest: true, // Флаг, указывающий, что это первый запрос, где ошибка будет отображена
//         };
//     };
//     // Если в сессии нет ошибки, просто переходим к следующему middleware
//     if (!req.session.error) {
//         return next();
//     }
//     // Если это первый запрос, где ошибка должна быть отображена
//     if (req.session.error.isFirstRequest) {
//         req.session.error.isFirstRequest = false; // Устанавливаем флаг, чтобы ошибка больше не отображалась
//         res.locals.error = req.session.error.message; // Передаём сообщение об ошибке в `res.locals`
//     } else {
//         res.locals.error = null; // Если это не первый запрос, очищаем ошибку
//     }
//     next(); // Переходим к следующему middleware
// };