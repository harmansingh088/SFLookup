({
    itemSelected : function(component, event, helper) {
        helper.itemSelected(component, event, helper);
    },
    serverCall :  function(component, event, helper) {
        helper.serverCall(component, event, helper);
    },
    clearSelection : function(component, event, helper){
        helper.clearSelection(component, event, helper);
    },
    
    doInit: function(component, event, helper) {
        var selectedCheckboxIndices = component.get("v.selectedCheckboxIndices");
        var index = component.get("v.index");
        if(selectedCheckboxIndices.includes(index)){
            component.set("v.selItem",'');
            component.set("v.server_result",[]);
            var input = document.getElementById('combobox-unique-id');
            if(input){
                input.value = '';
            }
            //component.set()
            var objectName = component.get("v.objectName");
            console.log("objectName--->",objectName);
            var field_API_text = component.get("v.field_API_text");
            var field_API_val = component.get("v.field_API_val");
            var field_API_search = component.get("v.field_API_search");
            var limit = component.get("v.limit");
            var selItemVal = component.get("v.selItemVal");	
            if(objectName && field_API_text && field_API_val && selItemVal){
                var getLookupFieldOnInit = component.get("c.getLookupFieldOnInit");
                getLookupFieldOnInit.setParams({
                    objectName : objectName,
                    fld_API_Text : field_API_text,
                    fld_API_Val : field_API_val,
                    lim : limit,
                    fld_API_Search : field_API_search,
                    intialFieldId : selItemVal
                    
                });
                getLookupFieldOnInit.setCallback(this, function(response){
                    
                    var state = response.getState();
                    if(state=='SUCCESS')
                    {
                        console.log('got the field on init');
                        var returnVal = response.getReturnValue();
                        var parseReturnVal = JSON.parse(returnVal);
                        console.log('parseReturnVal--->',parseReturnVal);
                        
                        component.set("v.selItem",parseReturnVal[0]);
                    }
                    
                });$A.enqueueAction(getLookupFieldOnInit);
            }
            //console.log('selItemValInner----->',selItemVal);
        }
        
        
        
    }
    
    
})
