//////////////
Blockly.Blocks['phi']={init:function(){
    this.appendDummyInput()
        .appendField("phi");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour('#00CC00')}
}

Blockly.Arduino['phi']=function(block){
    return ["500", Blockly.Arduino.ORDER_ATOMIC];
}
