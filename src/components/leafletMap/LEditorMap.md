#### LEditorMap 组件 使用说明

###### props

- options
    - type: Object

    - description

        同 **leaflet** 实例的 地图 options 一样，用与设置地图实例的属性,
        修改该值后，地图会实时响应设置

    eg：

```
   options = {
        preferCanvas: true, // 优先使用canvas 绘画 地图
        zoomControl: false, // 缩放控件
        attributionControl: false, // 右下角角标
        maxZoom: 24,
        dragging: true,
        zoom: 14,
        nativeZoom: 18,
        scrollWheelZoom: true      
   }
```

#### events

  - mapInitEnd

    组件实例初始化完成后触发该事件
  
  - ploygon-update

    组件内部维持有一个多边形数据结构 ，当多边形数据结构变化时（比如圈地过程中，圈地结束等等动作），会触发该事件，并将更新后的多边形数据以入参的形式返回, 在重新选择圈地时也会触发该事件
    
    eg：

```
  <l-editor-map @ploygon-update="(polygon) => { console.log(polygon)}"></l-editor-map>

  // polygon 数组的结构为 [[lat,lng],[lat,lng]]
```

