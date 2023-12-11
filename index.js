let express = require("express");
// express모듈을 선언   +   어떤 모듈을 쓸건지 require로 지정   =    이제 이 구문을 통해 express모듈이 사용 가능한 상태가 됨

let axios = require("axios");
// axios 모듈을 사용하겠다

let app = express ();
// app 이라는 변수 하나를 더 선언하여 express객체를 할당하자     이제 이 구문을 통해 app이라는 변수는 express 모듈을 가르키게 됨

let port = process.env.PORT || 5000;


app.use(express.static('public'));
// 커스텀 마커를 사용하기 위해 public 폴더 안 파일과 localhost:5000 연동되게 해줌

app.use(express.static("public_html"));
// express의 use 메소드를 선언하고 express.static이라고 괄호 사이에 입력한 후  public_html 로 지정하겠다
// 이제 public_html 폴더 아래에 있는 모든 파일들은 app.use 즉 express 모듈의 웹서버가 구동되게함

app.listen(port,function(){
    console.log("HTML 서버 시작됨")
})
// express 서비스가 작동될 포트 지정 보통 80번 많이씀 그리고 포트 열렸는지 확인해주기위해 콘솔을 적음
// app.listen에 port를 사용해주고 대신 위에 포트 80변수를 선언해주자 이건 사용되기 앞서 그 이전에 설정되야함
// 이제 위로 가서 포트 80 변수를 선언해주자  process.env.PORT는 환경설정 내용이다



//현재 app.use를 사용해 웹서버를 열은 상황이다 근데
//한페이지만 이름을 pharmach_list따로 열어보겠다 
//이 경우는 app.get으로 가능하다
//그리고 여기 접속했을때 어떤 데이터를 보낼지 결정가능

/////////

////////


app.get ("/pharmach_list", (req, res) =>  {
        let api = async() => {
            let response = null;

            try {
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                params: {
                        "serviceKey": "mL6hpE93V2cGEHnZNYbp2kbpZIm2IFyc9rhdh2wIaUseyjghN/lJSV7tSchmbL47mZsX8gNcLVtGpsTxQkstdA==",
                        "Q0": req.query.Q0,
                        "Q1": req.query.Q1,
                        "QT": req.query.QT,
                        "QN": req.query.QN,
                        "ORD": req.query.ORD,
                        "pageNo": req.query.pageNo,
                        "numOfRows": req.query.numOfRows    //  1000개의 데이터를 1장에 한번에 받겠다 
                    }
                })
            }








            catch(e) {
                console.log(e);
            }






            
            return response;
        }


        api().then((response) => {
            res.setHeader("Access-Control-Allow-Origin", "*");    // * = all,   access control 근원(origin)으로 가능한 것들은 전부 허용해줘라    이렇게 세팅시 cors 로 인한 문제 해결 가능
            res.json(response.data.response.body); // data.response.body가 위에 보이는 약국데이터다, 이를 pharmach_list 경로로 접근하는 컴퓨터에게 데이터 제공
        });  
});


 


// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=mL6hpE93V2cGEHnZNYbp2kbpZIm2IFyc9rhdh2wIaUseyjghN%2FlJSV7tSchmbL47mZsX8gNcLVtGpsTxQkstdA%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10