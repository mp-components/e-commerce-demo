Page({
  data: {
    menus: [
      {
        id: 1,
        title: '热卖',
        sku: 5,
      },
      {
        id: 2,
        title: '促销',
        sku: 3,
      },
      {
        id: 3,
        title: '面包',
        sku: 6,
      },
      {
        id: 4,
        title: '蛋糕',
        sku: 2,
      },
      {
        id: 5,
        title: '甜点',
        sku: 10,
      },
      {
        id: 6,
        title: '套餐',
        sku: 4,
      },
    ],
    activeTab: 1,
  },
  onLoad() {
    // 基础库版本需要 1.9.3 及以上
    this._observer = wx.createIntersectionObserver(null, { observeAll: true, initialRatio: 0.001 });
    this._observer
      .relativeTo('#holder')
      .observe('.sku-group', (res) => {
        if (res.intersectionRatio > 0) {
          const id = +res.dataset.id;
          this.setData({ activeTab: id });
        }
      });
    this.getSkuPosition();
  },
  onUnload() {
    this._observer.disconnect();
  },
  // 列表数据发生变化后需要重新执行一遍
  getSkuPosition() {
    this._positions = {};
    // 基础库版本需要 1.4.0 及以上
    wx.createSelectorQuery().selectAll('#recommend, .sku-group').boundingClientRect((res) => {
      let nextHieght = res[0].height;
      for (let i = 1; i < res.length; i++) {
        const { id } = res[i].dataset;
        this._positions[id] = nextHieght;
        nextHieght += res[i].height;
      }
    }).exec();
  },
  handleTabTap(event) {
    const { id } = event.currentTarget.dataset;
    wx.pageScrollTo({ scrollTop: this._positions[id] + 2 });
  },
})
