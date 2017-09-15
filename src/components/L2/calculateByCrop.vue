<template>
    <div class="calculate-by-crop">
        <div class="title">按划定地块计算</div>
        <div class="content">
            <p>您已划定的土地总面积：</p>
            <p>{{area}}公顷</p>
            <div v-show="isResult">
                <ul v-for="item in croplist">
                    <li><span class="color" :style="{background: item.color}"></span><span class="name">{{item.name}}：</span>{{(item.area / 10000).toFixed(2)}}公顷</li>
                </ul>
            </div>
            <div>{{tips}}</div>
            <div><el-button v-show="!isResult" type="primary" @click="handleCrop" class="btn" :disabled="isDisabled">计算区域内作物分布</el-button></div>
            <div class="btn_reset"><el-button type="danger" @click="handleChoose" class="btn" :disabled="isDisabled">重新划定土地</el-button></div>
        </div>
    </div>
</template>

<script>
import * as util from 'util/utils'
import * as api from 'service/api'

export default {
    data () {
        return {
            isResult: false,
            isDisabled: false,
            croplist: [],
            tips: ''
        }
    },
    props: {
        editorMap: {
            default: false
        },
        bounds: {
            default: []
        }
    },
    computed: {
        boundsArray: function () {
            if (this.bounds.length >= 3) {
                let temp = this.bounds.concat()
                return temp.concat([temp[0]])
            } else {
                return []
            }
        },
        area: function () {
            if (this.boundsArray.length >= 4) {
                return (parseFloat(util.calculateArea(this.boundsArray)) / 10000).toFixed(2)
            } else {
                return 0
            }
        }
    },
    methods: {
        /* 重选土地 */
        handleChoose () {
            if (this.editorMap.clear) {
                this.editorMap.clear()
            }
            this.isResult = false
            this.tips = ''
        },
        /* 从后台获取耕地面积 */
        async handleCrop () {
            if (this.boundsArray.length < 4) {
                this.$message({
                    type: 'error',
                    message: '请完成圈地'
                })
                return
            }
            this.isDisabled = true
            this.tips = '正在计算中...'
            try {
                var res = await api.calculateByCrop({
                    shapetype: 'croppolygon',
                    points: this.boundsArray
                })
            } catch (e) {
                console.log(e)
                this.$message({
                    type: 'error',
                    message: '服务器繁忙，请稍后再试'
                })
                this.isDisabled = false
                return
            }
            this.isDisabled = false
            if (res.code !== 2000) {
                this.$message({
                    type: 'error',
                    message: '服务器繁忙，请稍后再试'
                })
                return
            }
            this.isResult = true
            this.transformationName(res.data)
            if (this.croplist.length === 0) {
                this.tips = '暂无'
            } else {
                this.tips = ''
            }
        },
        transformationName (data) {
            let _data = []
            for (let i = 0; i < data.length; i++) {
                switch (data[i].class) {
                    case 'Corn':
                        data[i].name = '玉米'
                        data[i].color = '#fff40a'
                        _data.push(data[i])
                        break
                    case 'Sorghum':
                        data[i].name = '高粱'
                        data[i].color = '#ffb446'
                        _data.push(data[i])
                        break
                    case 'Soybeans':
                        data[i].name = '大豆'
                        data[i].color = '#268c00'
                        _data.push(data[i])
                        break
                    case 'Sunflower':
                        data[i].name = '向日癸'
                        data[i].color = '#ffff00'
                        _data.push(data[i])
                        break
                    case 'Wheat':
                        data[i].name = '小麦'
                        data[i].color = '#967832'
                        _data.push(data[i])
                        break
                    case 'Millet':
                        data[i].name = '小米'
                        data[i].color = '#73004c'
                        _data.push(data[i])
                        break
                    case 'Alfalfa':
                        data[i].name = '苜蓿'
                        data[i].color = '#ffa8e3'
                        _data.push(data[i])
                        break
                    case 'Potatoes':
                        data[i].name = '土豆'
                        data[i].color = '#b06600'
                        _data.push(data[i])
                        break
                    default :
                        data[i].name = ''
                }
            }
            this.croplist = _data
        }
    }
}
</script>

<style scoped>
li,p{ margin:0; padding:0}
ol,ul{ list-style:none}

.calculate-by-crop{ background:#fff; border-radius:2px; overflow:hidden; width:250px}
.calculate-by-crop .title{ color:#fff; text-align:center; background:#333; padding:10px 0}
.calculate-by-crop .content p{ line-height:1.5; margin:10px 0}
.calculate-by-crop .content{ padding:10px 20px; font-size:16px}
.calculate-by-crop .content li{ padding-bottom:5px}
.calculate-by-crop .content li .color{ width:14px; height:14px; display:inline-block; margin-right:5px; position:relative; top:1px}
.calculate-by-crop .content li .name{ width:80px; display:inline-block}
.calculate-by-crop .btn{ width:100%}
.calculate-by-crop .btn_reset{ padding-top:20px}
</style>