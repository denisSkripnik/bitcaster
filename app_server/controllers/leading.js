var path = require('path');

var ru_page={
			lang:'ru',
			title:'Аналитика нового поколения. Уже скоро',
			subject:'Ключевые индикаторы блокчейна в одном месте',
			banner_text:'Вопросы? Следите за нами',
			agregator:{head:'Агрегация и анализ',
			           problem:'Слишком много блокчейн бирж! Где заключить выгодную сделку?',
			           detail:'Цель - собрать и обработать индикаторы с 10-ти популярных  бирж. Вы получите наиболее оперативную информацию в удобном для сравнения виде'
		              },
			forecaster:{head:'Прогноз',
			           problem:'Вы до сих пор гадаете на сомнительных индикаторах?',
			           detail:'Мы строим и публикуем прогнозы на основании математических моделей, которые дают точность более чем 80% для большинства блокчейнов.'
		              },
			recomendation:{head:'Оповещения',
			           problem:'Не успеваете следить за рынком?',
			           detail:'Веб приложение  выводит уведомления об изменениях индикаторов на устройстве клиента даже при закрытом браузере. Оповещения имеют индивидуальные настройки и шанс превратится в умную рекомендационную систему. Как Вам идея?'
		              }
	};

var en_page={
	        lang:'en',
			title:'The new generation analytics. Coming Soon',
			subject:'The most impotant Blockchain indicators in one place',
			banner_text:'Any Questions? Join Us',
			agregator:{head:'Aggregation and analysis',
			           problem:'Too many Blockchain markets! Where to make a good order?',
			           detail:"The goal is to collect and process indicators from 10 popular exchanges. You'll get the up-to-date information  in adapted for comparison form."
		              },
			forecaster:{head:'Forecast',
			           problem:'Do you still believing in questionable indicators?',
			           detail:"Wе are making and publishing forecasts, which based on mathematical models. It's giving an accuracy of more than 80% for most crypto coins instruments."
		              },
			recomendation:{head:'Alerts',
			           problem:"Don't have time to follow the market?",
			           detail:'Our web app is progressive! It displays notifications about changes in indicators on the client device, even when the browser is closed. Enventually it will turn into intelligent recommender system. How do you like the idea?'
		              }
	};
	
function is_ru(req){
	var lang=req.get('accept-language');
	if (lang){
		if (lang.split(',')[0]=='ru-RU' || lang.split(',')[0]=='uk-UA'){
			return true;
		}
	}
	return false;

}


function get_lang_content(req){
	console.log(req.query.ln);
	if  (!req.query.ln && is_ru(req)){
		return ru_page;
	}
	else if (req.query.ln=='ru'){
		return ru_page
}
	else {
		return en_page;
	}
}


function leading(req, res, next) {
  res.render('leading', get_lang_content(req));
  }

function demo(req,res,next){
	res.sendFile(path.join(appRoot, 'app_client', 'client.html'));
}

module.exports.leading=leading;
module.exports.demo=demo;
