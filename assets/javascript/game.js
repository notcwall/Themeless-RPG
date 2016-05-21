var playerCharacter;
var playerDiv;
var enemyCharacter;
var enemyDiv;
var killCount = 0;
var hasChosenCharacter = false;
var characterBank = [
	new Character("Terry Cruz", 275, 10, 21),
	new Character("Gigantic Sloth", 350, 8, 11),
	new Character("Ziggy Stardust", 135, 30, 35),
	new Character("Batman", 215, 14, 28),
]

function initializeGame (){
	$('#playerInfoBox').html('<h2>Choose Your Character');
	for(var i = 0; i < characterBank.length; i++){
		characterBank[i].reset();
		$('#middleBar').append('<div class="unchosenCharacter"><p>' + 
		characterBank[i].name + '<br>Hitpoints: ' + characterBank[i].hitpoints + 
		'<br>Damage/Counter: ' + characterBank[i].attackDamage + '/' + characterBank[i].counterDamage);
		var newId = characterBank[i].name.replace(' ', '');
		$('#middleBar').children().eq(i).attr('id', newId);
		$('#middleBar').children().eq(i).data('charNum', i);
	}
	playGame();
}

function Character (name, hitpoints, attackDamage, counterDamage){

	var baseATK = attackDamage;
	var baseHP = hitpoints;
	var baseATK = attackDamage;
	var baseCTR = counterDamage;

	this.attack = function(enemy) {
		enemy.hitpoints -= this.attackDamage;
		this.hitpoints -= enemy.counterDamage;
		this.gainExperience();
	}

	this.gainExperience = function() {
		this.attackDamage += baseATK;
	}

	this.reset = function(){
		this.name = name;
		this.hitpoints = baseHP;
		this.attackDamage = baseATK;
		this.counterDamage = baseCTR;
	}
}

function playGame(){

	$('.unchosenCharacter').on('click', function() {

		if(hasChosenCharacter == false){
			playerDiv = $(this);
			playerDiv.attr('class', 'chosenCharacter');
			playerCharacter = characterBank[$(this).data('charNum')];
			hasChosenCharacter = true;
			$(this).remove()
			$('#playerBar').append(playerDiv);
			$('.infoBox').empty()
			$('#enemyInfoBox').html("<h2>Choose Enemy Character");
		}
		else if(hasChosenCharacter == true){
			enemyDiv = $(this);
			enemyDiv.attr('class', 'chosenCharacter');
			enemyCharacter = characterBank[$(this).data('charNum')];
			hasChosenCharacter = null;
			$(this).remove();
			$('#enemyBar').append(enemyDiv);
			$('.infoBox').empty();
			$('#middleBar').append('<div class="infoBox" id="middleInfoBox"><h2>To the DEATH!');
		}
	});

	$('#attackButton').on('click', function(){
		playerCharacter.attack(enemyCharacter);
		$('#' + playerCharacter.name.replace(' ', '')).html('<p>' + 
		playerCharacter.name + '<br>Hitpoints: ' + playerCharacter.hitpoints + 
		'<br>Damage/Counter: ' + playerCharacter.attackDamage + '/' + playerCharacter.counterDamage);
		$('#' + enemyCharacter.name.replace(' ', '')).html('<p>' + 
		enemyCharacter.name + '<br>Hitpoints: ' + enemyCharacter.hitpoints + 
		'<br>Damage/Counter: ' + enemyCharacter.attackDamage + '/' + enemyCharacter.counterDamage);
		if(enemyCharacter.hitpoints <= 0 && playerCharacter.hitpoints > 0){
			killCount++;
			hasChosenCharacter = true;
			$('#' + enemyCharacter.name.replace(' ', '')).remove();
			enemyCharacter = null;
			if(killCount == 3){
				$('#middleInfoBox').html('<h2>You win!');
				enemyCharacter = null;
			}
			else{
				$('.infoBox').empty();
				$('#enemyInfoBox').html("<h2>Choose Enemy Character");
			}
		}
		else if(playerCharacter.hitpoints <= 0){
			$('.infoBox').empty();
			$('#middleInfoBox').html('<h2>You lose!');
			enemyCharacter = null;
		}
	});
}

initializeGame();