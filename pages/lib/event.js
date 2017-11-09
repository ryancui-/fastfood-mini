/**
 * 事件总线
 */
class Subscription {
  eventBus;
  eventName;
  cbId;

  constructor(eventBus, eventName, cbId) {
    this.eventBus = eventBus;
    this.eventName = eventName;
    this.cbId = cbId;
  }

  // 销毁订阅事件
  off() {
    this.eventBus.off(this.eventName, this.cbId);
  }
}

class EventBus {
  cacheMax;
  cache;
  stores;
  getAutoIncrese;

  constructor(cacheMax) {
    this.stores = {};
    this.cache = {};
    this.cacheMax = cacheMax || 1;

    this.getAutoIncrese = (function() {
      let seq = 1;
      return function () {
        ++seq;
      };
    })();
  }

  // 订阅事件，返回 Subscription 对象
  on(eventName, fn) {
    if (!this.stores[eventName]) {
      this.stores[eventName] = [];
    }

    // replay the emit value on new fn
    if (this.cache[eventName]) {
      this.cache[eventName].forEach(payload => {
        fn.apply(null, payload);
      });
    }

    const cbId = this.getAutoIncrese();
    this.stores[eventName].push({
      id: cbId,
      fn
    });

    return new Subscription(this, eventName, cbId);
  }

  // 广播
  emit(eventName, payload) {
    // reserve the emit value
    if (!this.cache[eventName]) {
      this.cache[eventName] = [];
    }
    if (this.cache[eventName].length === this.cacheMax) {
      this.cache[eventName].shift();
    }
    this.cache[eventName].push(payload);

    const eventArray = this.stores[eventName];
    if (eventArray) {
      eventArray.forEach(e => {
        e.fn.apply(null, payload);
      });
    }
  }

  // 销毁订阅
  off(eventName, cbId) {
    const eventArray = this.stores[eventName];
    if (!eventArray) {
      return;
    }

    for (let i = 0; i < eventArray.length; i++) {
      if (eventArray[i].id === cbId) {
        eventArray.splice(i, 1);
        break;
      }
    }
  }
}

module.exports = {
  EventBus
};