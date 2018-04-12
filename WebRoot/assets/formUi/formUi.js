var hzMixin = {
   data: function () {
    return {
      isError: '',
      errorWord:'',
      showErrorWord:false
    }
  },
  watch:{
  	value:function(val,oldVal){
  		this.$parent.result[this.uiName] = val;
  		if(this.validation){
  			this.hzValidateClass = this.hzValidate(this.validation);
  		};
  	}, 
  	valChecked:function(val,oldVal){
  		this.$parent.result[this.uiName] = val;
  	}
  },
  beforeCreate:function(){
  },
  created:function(){
  	if(this.val)
  	this.$parent.result[this.uiName] = this.val;
  },
  mounted:function(){
  	$(this.$el).find(".hz-form-right").append("<div class='hz-error-content'></div>");
  },
  methods:{
  	hzValidate:function(validateVals){
  	},
  	doValidate:function(validateVals){
  		debugger
  		var va = this.validation;
		this.isError ='';
		this.errorWord ='';
		this.showErrorWord = false;
  		if(va){
  			if(va.required){
  				if(this.value == ''){
					this.isError ='is-error';
					this.errorWord = '此项为必填项';
					this.showErrorWord = true;
	  			}
  			}
  			if(va.wordRange){
  				var range = va.wordRange;
  				if(this.value.length<range[0]||this.value.length>range[1]){
  					this.isError ='is-error';
					this.errorWord = '字数长度范围为'+range[0]+'到'+range[1];
					this.showErrorWord = true;
  				}
  			}
  			if(va.type){
  				if(va.type == "date"){
					var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/;
					if(!reDateTime.test(this.value)){
						this.isError ='is-error';
						this.errorWord = "时间格式不对";
						this.showErrorWord = true;
 					}
  				}
  				if(va.type == "datetime"){
					var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
					if(!reDateTime.test(this.value)){
						this.isError ='is-error';
						this.errorWord = "时间格式不对";
						this.showErrorWord = true;
 					}
  				}
  				if(va.type == "daterange"){
				
  				}
  				if(va.type == "phone"){
  					var reg = /^[1][0-9]{10}$/;
 					if(!reg.test(this.value)){
						this.isError ='is-error';
						this.errorWord = "电话格式不对";
						this.showErrorWord = true;			
 					}
  				}
  			}
  		}
  		this.changeErrorContent();
  	},
  	changeErrorContent:function(){
  		$(this.$el).find(".hz-error-content").text(this.errorWord).css("display",(this.showErrorWord?'block':'none'));
  	}
  },
  computed:{
  	isRequired:function(){
  		if(this.validation){
			if(this.validation.required){
				return 'is-required';
			}
  		}
  		return '';
  	}
  }
};
var hzCustomMixin = {
  created:function(){
  	if(this.value)
  	this.$parent.$parent.result[this.name] = this.value;
  },
};

var hzMixinComputTime = {
  computed:{
  	rangeType:function(){
  		return this.type;
  	},
  	placeholder:function(){
  		var ret;
  		if(this.type=="datetime"){
			ret = '请选择时间日期';
  		}else if(this.type=="datetimeRange"){
  			ret = '请选择时间范围';
  		}else if(this.type=="daterange"){
  			ret = '请选择日期范围';
  		}
  	}
  },
};


/*标题*/
Vue.component('hz-title', {
  template: '#hzTitleTemplate',
  props: ['hz-title'],
  data: function () {
    return {
      name: this.hzTitle
    }
  }
});

/*选择框*/
Vue.component('hz-select', {
  template: '#hzSelectTemplate',
  props: ['hz-label','ui-name','opts','val','multi','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      options: this.opts,
      value: this.val,
      multiple:this.multi||false
    }
  },
  mixins: [hzMixin]
});

/*radio*/
Vue.component('hz-radio', {
  template: '#hzRadioTemplate',
  props: ['hz-label','ui-name','opts','val','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      options: this.opts,
      value: this.val
    }
  },
  mixins: [hzMixin]
});

/*自定义组件*/
Vue.component('hz-slot', {
  template: '#hzSlotTemplate',
  props: ['hz-slot-name'],
  render: function (createElement) {
    return createElement(this.hzSlotName);
  }
});

/*checkbox*/
Vue.component('hz-checkbox', {
  template: '#hzCheckboxTemplate',
  props: ['hz-label','ui-name','opts','checkeds','all-check','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      options: this.opts,
      valChecked: this.checkeds,
	  checkAll:this.allCheck,
	  value:this.val
    }
  },
  computed:{
  		isIndeterminate: function(){
  			return this.valChecked.length != this.options.length
  		}
  },
  methods:{
  	handleCheckAllChange(event) {
  		var checkeds = [];
  		$.each(this.options,function(i,o){
			checkeds.push(o.value);
  		})
        this.valChecked = event.target.checked ? checkeds : [];
        this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
    	var checkedCount = value.length;
        this.checkAll = checkedCount === this.options.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
    }
  },
  mixins: [hzMixin]
});

/*Input*/
Vue.component('hz-input', {
  template: '#hzInputTemplate',
  props: ['hz-label','ui-name','place','val','type','validation'],
  data: function () {
    return {
      inputType:this.type,
      label: this.hzLabel,
      name: this.uiName,
      placeholder: this.place||'请输入...',
      value: this.val
    }
  },
  mixins: [hzMixin]
});



/*cascader*/
Vue.component('hz-cascader', {
  template: '#hzCascaderTemplate',
  props: ['hz-label','ui-name','place','val','opts','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      options:this.opts,
      value: this.val||[]
    }
  },
  mixins: [hzMixin]
});

/*footer*/
Vue.component('hz-footer', {
  template: '#hzFooterTemplate',
  props: ['ui-name','text'],
  methods:{
  	onSubmit:function(){
  		//把爸爸还给爸爸。。。是几个意思。。哈哈哈
  		this.$emit('submit',this.$parent.result);
  	},
  	onCancel:function(){
  		this.$emit('cancel',this.$parent.result);
  	}
  }
});

/*dateRange*/
Vue.component('hz-daterange', {
  template: '#hzDaterangeTemplate',
  props: ['hz-label','ui-name','format','val','type','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      formatDate:this.format||'yyyy-MM-dd',
      value: this.val,
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  mixins: [hzMixin]
});

/*dateRange*/
Vue.component('hz-daterange', {
  template: '#hzDaterangeTemplate',
  props: ['hz-label','ui-name','format','val','type','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      formatDate:this.format||'yyyy-MM-dd hh:MM:ss',
      value: this.val,
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  mixins: [hzMixin,hzMixinComputTime]
});

/*datetime*/
Vue.component('hz-daterange', {
  template: '#hzDaterangeTemplate',
  props: ['hz-label','ui-name','format','val','type','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      formatDate:this.format||'yyyy-MM-dd hh:MM:ss',
      value: this.val,
      pickerOptions:{}
    }
  },
  mixins: [hzMixin,hzMixinComputTime]
});


/*switch*/
Vue.component('hz-switch', {
  template: '#hzSwitchTemplate',
  props: ['hz-label','ui-name','val','text','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      value: this.val,
    }
  },
  computed:{
  	onText:function(){
  		return this.text[0]
  	},
  	offText:function(){
  		return this.text[1]
  	}
  },
  mixins: [hzMixin]
});

/*transfer*/
Vue.component('hz-transfer', {
  template: '#hzTransferTemplate',
  props: ['hz-label','ui-name','val','data','titles','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      value: this.val||[],
      transferTitles:this.titles||['请选择','已选中']
    }
  },
  computed:{
  	 transferdata:function(){
  	 /*	$.each(this.data,function(i,o){
  	 		o.key = i;
  	 	});*/
  	 	return this.data;
  	 }
  },
  methods:{
  },
  mixins: [hzMixin]
});

/*upload*/
Vue.component('hz-upload', {
  template: '#hzUploadTemplate',
  props: ['hz-label','ui-name','val','action','validation'],
  data: function () {
    return {
      label: this.hzLabel,
      name: this.uiName,
      value: this.val||''
    }
  },
  methods:{
  	handleRemove:function(file, fileList) {
       console.log(file, fileList);
    },
    handlePictureCardPreview:function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mixins: [hzMixin]
});

/*form 组件*/
Vue.component('hz-form', {
    template: '#hzFormTemplate',
    props: ['formData'],
    data: function () {
        return {
		  result:{},
		  showVBody:true,
		  loading:false,
    	  uiObjs: this.formData||[],
      }
    },
    created:function(){
 		var self = this;
 		setTimeout(function(){
 			self.loading = false;
 		},100) 		
 	},
 	components:{

 	},
 	watch:{
 		result:function(){
 			console.log(111)
 		}
 	},
 	methods:{
		inputClick:function(evt){
			console.log(evt)
		},
		submit:function(res){
			var subFunc;
			$.each(this.uiObjs,function(i,o){
				if(o.type == "footer"){
					subFunc = o.onSubmit;
				}
			});
			if(subFunc){
				//需要增加一个校验
				subFunc(res);
				this.$notify({
		          title: '成功',
		          message: '发送成功',
		          type: 'success',
		          duration:1000
		        });
			}					
		},
		cancel:function(res){
			this.showVBody = false;
		},
 	},
});