

let app = {
    init() {
        var _this = this
        this.getData((data)=>{
            console.log(data)
            _this.render(data)
            _this.bind()
        })
    },

    bind() {
        $$('#app .tabs>li').forEach(function(tab, index){
            tab.onclick = function(){
                $$('#app .tabs>li').forEach(node=>{
                    node.classList.remove('active')
                })
                this.classList.add('active')
                // let index = [].indexOf.call($$('#app .tabs>li'), this)
                $$('#app .panels>li').forEach(panel=>panel.classList.remove('active'))
                $$('#app .panels>li')[index].classList.add('active')
            }
        })
    },
     
    render(data) {
        $('#app .location .city').innerText = data.weather[0].city_name
        var last_update = new Date()
        var suggestion = data.weather[0].today.suggestion
        var future = data.weather[0].future
        var code = data.weather[0].now.code
        console.log(code)
        var codeImg = `http://weixin.jirengu.com/images/weather/code/${code}.png`
        console.log(codeImg)
        $('#app .location .time').innerText = last_update.getHours() + ':' + fixTime(last_update.getMinutes())
        // data.weather[0].index.forEach(function(item, index){
        //     $$('#app .tabs .title')[index].innerText = item.title
        //     $$('#app .panels>li')[index].innerText = item.des
        // })
        $('#app .suggestion .panels .close').innerText = suggestion.dressing.details
        $('#app .suggestion .panels .wash').innerText = suggestion.car_washing.details
        $('#app .suggestion .panels .healthy').innerText = suggestion.flu.details
        $('#app .suggestion .panels .sport').innerText = suggestion.sport.details
        $('#app .suggestion .panels .sunlight').innerText = suggestion.uv.details
        $('#app .detail .current .temperature .number').innerText = data.weather[0].now.temperature
        $('#app .detail .current .data').innerText = data.weather[0].future[0].date + ' ' + data.weather[0].future[0].day
        $('#app .detail .current .weather-pic img').src = codeImg
        $('#app .detail .current .more').innerText = 'PM2.5/' + '' + data.weather[0].now.air_quality.city.pm25 + ' ' + data.weather[0].now.air_quality.city.quality
        $$('#app .detail .future').forEach(function(item, index){
            var futureImg = `http://weixin.jirengu.com/images/weather/code/${future[index+1].code1}.png`
            item.querySelector('.week').innerText = future[index+1].day
            item.querySelector('.weather-pic img').src = futureImg
            item.querySelector('.temperature').innerText = future[index+1].low + '~' + future[index+1].high + '℃'
        })
    },

    getData(callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com', true)
        xhr.send()
        xhr.onload = function() {
            callback(JSON.parse(xhr.responseText))
        }
    }
}

app.init()

function $(selector) {
    return document.querySelector(selector)
  }
function $$(selector) {
    return document.querySelectorAll(selector)
  }
function fixTime(t){
    if(t.toString().length == 1){
        return '0' + t
    }
    return t
  }

