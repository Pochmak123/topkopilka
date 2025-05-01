(function () {
    // Функция определяет, является ли устройство именно телефоном.
    // Для телефонов в userAgent должен присутствовать один из идентификаторов,
    // а ширина экрана должна быть меньше или равна, например, 767 пикселей.
    function isPhoneDevice() {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      // Для iPhone:
      if (/iPhone/i.test(ua)) {
        return true;
      }
      // Для Android: наличие слова "Mobile" говорит о том, что это именно телефон (а не планшет)
      if (/Android/i.test(ua) && /Mobile/i.test(ua)) {
        return true;
      }
      return false;
    }
  
    // Альтернативная проверка по ширине экрана (например, если не хочется полагаться только на UserAgent)
    // Можно комбинировать обе проверки (потребуйте, чтобы совпадали оба условия):
    function isPhone() {
      return isPhoneDevice() && window.innerWidth <= 767;
    }
    
    // Получение значения проверки
    const phone = isPhone();
    
    // Получаем текущий путь (в нижнем регистре для надежности)
    const path = window.location.pathname.toLowerCase();
  
    // Если страница связана с Dashboard...
    if (path.indexOf("dashboard") !== -1) {
      if (phone) {
        // Если устройство телефон, а URL не содержит слово "dashboardmobile.html" → редирект на мобильную версию
        if (!path.includes("dashboardmobile.html")) {
          window.location.href = "dashboardmobile.html";
        }
      } else {
        // Если устройство не телефон, а URL содержит "dashboardmobile.html" → редирект на десктопную версию.
        // Согласно требованию десктопная версия имеет имя "dashboard.mobile"
        if (path.includes("dashboardmobile.html")) {
          window.location.href = "dashboard.mobile";
        }
      }
    }
    
    // Аналогичная логика для Index страниц:
    if (path.indexOf("index") !== -1) {
      if (phone) {
        if (!path.includes("indexmobile.html")) {
          window.location.href = "indexmobile.html";
        }
      } else {
        if (path.includes("indexmobile.html")) {
          window.location.href = "index.html";
        }
      }
    }
  })();