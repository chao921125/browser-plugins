<template>
    <div class="btn-box">
        <el-button class="btn-update" size="mini" @click="dialogVisible = true">修改数据</el-button>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                :modal="false"
                width="30%">
            <div>
                <el-input v-model="inputLine" placeholder="请输入数值修改折线图"></el-input>
            </div>
            <div slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateLineVal">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "BtnUpdateData",
        data () {
            return {
                dialogVisible: false,
                inputLine: 0,
                primaryVal: 0
            }
        },
        methods: {
            updateLineVal () {
                let len = document.querySelectorAll('#sycm-operator-core-index-chart-true > div.oui-card-content.alife-one-design-sycm-indexes-trend-card-content > div > div.alife-one-design-sycm-indexes-trend-chart-container.alife-one-design-sycm-indexes-trend-chart-container-payAmt > div > div > div > div > div.recharts-wrapper > svg > g.recharts-layer.recharts-cartesian-axis.recharts-yAxis.yAxis > g > g').length;
                this.primaryVal = len;
                this.inputLine = len;
                for (let i = 1; i <= len; i++) {
                    let dom = '#sycm-operator-core-index-chart-true > div.oui-card-content.alife-one-design-sycm-indexes-trend-card-content > div > div.alife-one-design-sycm-indexes-trend-chart-container.alife-one-design-sycm-indexes-trend-chart-container-payAmt > div > div > div > div > div.recharts-wrapper > svg > g.recharts-layer.recharts-cartesian-axis.recharts-yAxis.yAxis > g > g:nth-child(' + i + ') > text';
                    document.querySelector(dom).textContent = Math.floor(Math.random() * 10000).toString();
                }
            }
        }
    }
</script>

<style scoped>
</style>
