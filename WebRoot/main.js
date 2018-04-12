(function(){
	var initVueBody = function(){
		/* 自定义组件
			必须混合hzCustomMixin
			必须有name,value两个字段,用于点发送时组件返回值,name为key,value为值
		*/
		Vue.component('test-slot', {
		  template: '#testSlot',
		  data:function(){
		  	return {
		  		a:'我是自定义组件，我占领了这一行',
		  		name:'zidingyi',
		  		value:'111'
		  	}
		  },
		  mixins:[hzCustomMixin]
		});

		/*
			点击发送时触发的方法
		*/
		var submitSth = function(res){
			console.log(res);
		};
		setTimeout(function(){
			$("#hzUi").show();
		},50);
		var vm = new Vue({
		  el:'#hzUi',
		  data:{
			jsonArr:[
		 		{
		 			type:'title',
		 			title:'ui组件'
		 		},
		 		{
		 			type:'select',
		 			label:'单选框',
		 			name:'singleSel',
		 			multi:false,
		 			opts:[{
				          value: '1',
				          label: '期货'
				        }, {
				          value: '2',
				          label: '股票'
				        }],
				    value:'2'
		 		},
		 		{
		 			type:'select',
		 			label:'多选框',
		 			name:'multiSel',
		 			multi:true,
		 			opts:[{
				          value: '1',
				          label: '期货'
				        }, {
				          value: '2',
				          label: '股票'
				        }],
				    value:'2'
		 		},
		 		{
		 			type:'radio',
		 			label:'radio',
		 			name:'radio',
		 			url:'',//url和opts 2选1 同时传时，用url中的。
		 			opts:[{
				          value: '1',
				          label: '期货'
				        }, {
				          value: '2',
				          label: '股票'
				        }],
				    value:'2'
		 		},
		 		{
		 			type:'slot',
		 			slotName:'test-slot',
		 			name:'slotName',
		 			value:''
		 		},
		 		{
		 			type:'checkBox',
		 			label:'多选框',
		 			name:'checkboxName',
		 			allCheck: true,
		 			opts:[{value:'sh',text:'上海'},{value:'nj',text:'南京'},{value:'bj',text:'北京'}],
				    checked:['sh', 'nj'],
				    value:''
		 		},
		 		{
		 			type:'input',
		 			label:'简单输入框',
		 			name:'inputName',
		 			place:'请填写',//为空时默认为：请输入...
				    value:'',
				    validate:{
				    	required:true,
				    	wordRange:[1,3],
				    	type:''//可选 date datetime phone
				    }			    
		 		},
		 		{
		 			type:'cascader',
		 			label:'级联选择',
		 			name:'cascaderName',
		 			opts:[
		 				{
		 					value: 'zhinan',
          					label: '指南',
          					children:[{
          						value: 'shejiyuanze',
					            label: '设计原则',
					            children: [{
					              value: 'yizhi',
					              label: '一致'
					            }, {
					              value: 'fankui',
					              label: '反馈'
					            }]
          					}]
		 				},
		 				{
		 					value: 'zhinan111',
          					label: '指南222',
          					children:[{
          						value: 'shejiyuanze111',
					            label: '设计原则222',
					            children: [{
					              value: 'yizhi333',
					              label: '一致111'
					            }, {
					              value: 'fankui222',
					              label: '反馈333'
					            }]
          					}]
		 				}
		 			],
				    value:''			    
		 		},
		 		{
		 			type:'daterange',
		 			label:'日期范围',
		 			name:'daterangeName',
		 			format:'',//为空时默认为：yyyy/MM/dd
				    value:[new Date('2017-12-11'),new Date('2017-12-21')],
				    validate:{
				    	required:true
				    }			    
		 		},
		 		{
		 			type:'datetimerange',
		 			label:'时间范围',
		 			name:'datetimerangeName',
		 			format:'',//为空时默认为：yyyy/MM/dd hh:MM:ss
		 			validate:{
				    	required:true
				    },	
				    value:[new Date(2000, 10, 10, 10, 10),new Date(2000, 11, 11, 11, 10)],				    
		 		},
				{
		 			type:'datetime',
		 			label:'日期选择',
		 			name:'datetimeName',
		 			format:'',//为空时默认为：yyyy/MM/dd hh:MM:ss
				    value:new Date(2000, 10, 10, 10, 10),
				    validate:{
				    	required:true
				    }				    
		 		},
		 		{
		 			type:'switch',
		 			label:'发送短信',
		 			name:'switchName',
		 			place:'请填写',
		 			text:['是','否'],
				    value:true,//true false			    
		 		},
		 		{
		 			type:'transfer',
		 			label:'穿梭框',
		 			name:'transferName',
		 			titles:['来源','目标'],// 默认为 [请选择   已选中]
		 			data:[{key:'sh',label:'上海'},{key:'bj',label:'北京'},{key:'js',label:'江苏'},{key:'xb',label:'熊本'}],
				    value:['sh','bj']			    
		 		},
		 		{
		 			type:'footer',
		 			name:'footerName',
		 			text:'发送',
		 			onSubmit:submitSth
		 		},
		 		]
			}
	});
}
/*加载组件*/
var addFormUi = function(){
	var url = "assets/formUi/formUi.html";
	$("#formUiWraper").load(url,initVueBody);
}();
})();