
// JavaScript Document

//finish by Lecaf
//2011.3.23
/*����¼�*/
var addEventHandler=function(oTarget, sEventType, fnHandler){
	romoveEventHandler(oTarget, sEventType, fnHandler);
	if (oTarget.addEventListener){
		oTarget.addEventListener(sEventType, fnHandler, false);
	}else if(oTarget.attachEvent){
		oTarget.attachEvent("on" + sEventType, fnHandler);
	}else{
		oTarget["on" + sEventType] = fnHandler;
	}
}
/*ע���¼�*/
var romoveEventHandler=function(oTarget, sEventType, fnHandler){
	if (oTarget.removeEventListener){
		oTarget.removeEventListener(sEventType, fnHandler, false);
	}else if(oTarget.detachEvent){
		oTarget.detachEvent("on" + sEventType, fnHandler);
	}else{
		oTarget["on" + sEventType] = "";
	}
}
function editor(){
	var ieRange=false;
	var edit = document.createElement("iframe");
	edit.style.width = "500px";
	edit.style.height = "300px";
	edit.frameBorder=1;
	document.getElementsByTagName("body")[0].appendChild(edit);
	var win=edit.contentWindow;
	var doc=win.document;
	var _saveRange=function(){
		//IE�±���Range����
		if(!!document.all&&!ieRange){//�Ƿ�IE�����ж��Ƿ񱣴��Range����
			var sel=doc.selection;
			ieRange=sel.createRange();
			if(sel.type!='Control'){//ѡ��Ĳ��Ƕ���
				var p=ieRange.parentElement();//�ж��Ƿ��ڱ༭����
				if(p.tagName=="INPUT"||p==document.body)ieRange=false;
			}        
		}    
	}    
	var _insert=function(text){//�����滻�ַ���
	if (!!ieRange){
		ieRange.pasteHTML(text);
			ieRange.select();
			ieRange = false; //�����range����
		}else{//���㲻��html�༭������ʱ
			win.focus();
			if(document.all){
				doc.body.innerHTML += text; //IE���������
			}else{//Firefox
				var sel = win.getSelection();
				var rng = sel.getRangeAt(0);
				var frg = rng.createContextualFragment(text);
				rng.insertNode(frg); 
			}
		}    
	}
	var _ieEnter=function(){//IE�س��޸�
		var e = win.event;
		if(e.keyCode == 13){
			_saveRange();
			_insert("<br/>");
			return false;
		}
	}
	var _fnPaste=function(e){
		e.returnValue = false;
		var shtml=window.clipboardData.getData("Text"); //��ȫ���,ֻȡ���ı�
		_saveRange();
		_insert(shtml);//���ı�ճ����iframe
	}
	if(document.all){
		addEventHandler(edit,"load",function(){//�󶨱༭��ճ���¼�onpaste;
			with(doc.getElementsByTagName("body")[0]){
				addEventHandler(doc.getElementsByTagName("body")[0],"paste",function(event){
					_fnPaste(event);
������������	});
			}
		});
	}
	doc.designMode='On';//�ɱ༭
	doc.contentEditable = true;
	//����IE��FireFox�е㲻ͬ��Ϊ�˼���FireFox�����Ա��봴��һ���µ�document��
	doc.open();
	var headHTML='<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
����	var headHTML= headHTML + '<style>*{margin:0;padding:0;font:12px;}</style>';
����	var headHTML= headHTML +'</head>';
	doc.writeln('<html>'+headHTML+'<body></body></html>');
	doc.close();
	//IE�س����<br> �� FF ͳһ��
	if(document.all)doc.onkeypress = function(){return _ieEnter()};
	win.focus();
}
window.onload=editor;
