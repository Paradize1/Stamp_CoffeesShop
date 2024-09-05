const emulator = {
    StartCashin: function (cb) {
      // Включаем эмуляцию приёма купюр
      document.addEventListener('keydown', handleKeyDown);
  
      function handleKeyDown(event) {
        if (event.key === 'C') { // Нажмите 'C' для эмуляции приёма купюры
          const amount = prompt('Введите номинал купюры:'); // Запрос номинала купюры
          cb(Number(amount)); // Вызываем коллбэк с номиналом
        }
      }
  
      // Возвращаем функцию для остановки эмуляции
      return () => document.removeEventListener('keydown', handleKeyDown);
    },
  
    StopCashin: function (cb) {
      // Отключаем эмуляцию приёма купюр
      if (this.stopCashinHandler) {
        this.stopCashinHandler();
      }
      cb();
    },
  
    BankCardPurchase: function (amount, cb, display_cb) {
      // Эмуляция списания с банковской карты
      const status = Math.random() > 0.5; // Случайный успех или неудача
  
      const messages = [
        'Приложите карту',
        'Обработка карты',
        'Связь с банком',
        'Платёж прошёл успешно',
        'Платёж не прошёл'
      ];
  
      function simulateTransaction() {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        async function process() {
          for (const msg of messages) {
            display_cb(msg);
            await delay(1000); // Задержка между сообщениями
          }
          display_cb(status ? 'Платёж прошёл успешно' : 'Платёж не прошёл');
          cb(status); // Возвращаем результат транзакции
        }
        process();
      }
  
      simulateTransaction();
    },
  
    BankCardCancel: function () {
      // Эмуляция отмены операции по банковской карте
      this.BankCardPurchase(0, () => {}, (msg) => console.log(msg));
    },
  
    Vend: function (product_idx, cb) {
      // Эмуляция выдачи продукта
      const success = Math.random() > 0.5; // Случайный успех или неудача
  
      setTimeout(() => {
        cb(success); // Вызываем коллбэк с результатом
      }, 2000); // Задержка для имитации выдачи продукта
    }
  };
  
  export default emulator;