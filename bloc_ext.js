// Mes Blocs

var mes_blocs = ['button_is_pressed','print_message','ir_remote','vitesse_serie']

Blockly.Blocks['button_is_pressed']={init:function(){
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/factory/gamepad.png", 28, 28, "*"))
        .appendField("si le bouton")
        .appendField(new Blockly.FieldDropdown([["A", "1"], ["B", "2"], ["C", "3"], ["D", "4"]]), "_dropdown")
        .appendField("est pressé");
    this.appendStatementInput("_statement");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#FF00FF')}
};
Blockly.Arduino['button_is_pressed']=function(block){
    var value_statement = Blockly.Arduino.statementToCode(block, '_statement');
    var value_dropdown = block.getFieldValue('_dropdown');
    Blockly.Arduino.includes_['lib'] = '#include "Esplora.h";';
    var code = 'if (Esplora.readButton('+value_dropdown+')) {\n  '+value_statement+'\n};';
    return code
};
  
////////////////////
Blockly.Blocks['print_message']={init:function(){
    this.appendDummyInput()
        .appendField("envoyer")
        .appendField(new Blockly.FieldTextInput("message"), "_text")
        .appendField("sur le port série");
    this.appendValueInput("_block")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("transmission à");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(120)}
};
Blockly.Arduino['print_message']=function(block){
    var value_text = block.getFieldValue('_dropdown');
    var value_block = Blockly.Arduino.valueToCode(block, '_block', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.setups_['setup'] = 'Serial.begin('+value_block+');';
    var code = 'Serial.println("'+value_text+'");\n';
    return code
};
  
////////////////////
Blockly.Blocks['ir_remote']={init:function(){
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/factory/keyboard.png", 14, 14, "*"))
        .appendField("Télécommande");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("code HEX")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "_check");
    this.appendValueInput("_block")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("reception");
    this.setInputsInline(false);
    this.setColour('#FFD700')}
};
Blockly.Arduino['ir_remote']=function(block){
    var value_check = block.getFieldValue('_check') == 'TRUE';
    var value_block = Blockly.Arduino.valueToCode(block, '_block', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.includes_['irremote'] = '#include "IRremote.h";';
    Blockly.Arduino.definitions_['irrecv'] = 'IRrecv irrecv('+value_block+');';
    if (value_check) {
		Blockly.Arduino.definitions_['results'] = 'decode_results results;';
	}
    Blockly.Arduino.setups_['setup'] = 'irrecv.enableIRIn();';
    return ''
};
  
////////////////////
Blockly.Blocks['vitesse_serie']={init:function(){
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["1200", "1200"], ["9600", "9600"], ["19200", "19200"], ["31250", "31250"], ["57600", "57600"]]), "_dropdown")
        .appendField("bauds");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour('#00929f')}
};
Blockly.Arduino['vitesse_serie']=function(block){
    var value_dropdown = block.getFieldValue('_dropdown');
    var code = value_dropdown;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};
    
////////////////////
