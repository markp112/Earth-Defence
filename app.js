//constant definitions for repeated text
const MotherShip = "Mothership";
const Bomber = "Bomber";
const Fighter = "Fighter";

class Alien {
    isDead = false;
    isHit = false;
    constructor(type, hitPoints, damage, hasDiedGraphic, isLivingGraphic) {
        this.type = type;
        this.hitPoints = hitPoints;
        this.damage = damage;
        this.hasDiedGraphic = hasDiedGraphic;
        this.isLivingGraphic = isLivingGraphic;
    }

    takesHit() {
        const hpRemaining = this.hitPoints - this.damage;
        this.hitPoints = hpRemaining <= 0? 0 : hpRemaining;
        this.isDead = this.hitPoints === 0;
        this.isHit = true;
    }
}

class AlienIvasion {
    _invasionFleet = [];

    get invasionFleet() {
        return this._invasionFleet;
    }

    addToFleet(invader) {
        this._invasionFleet.push(invader);
    }

    clearHits() {
        this._invasionFleet.forEach(invader => invader.isHit = false);
    }

    getLivingAliens() {
        return this._invasionFleet.filter(invader => !invader.isDead);
    }

    damageInvader() {
        this.clearHits();
        const aliensLeft = this.getLivingAliens().length - 1;
        const index = Math.round(Math.random() * aliensLeft);
        this.getLivingAliens()[index].takesHit();
    }

    mothershipHasDied () {
        this.invasionFleet.forEach(alien => alien.hitPoints = 0);
    }

    isMothershipDead() {
        const mothership = this._invasionFleet.filter(
            invader => invader.type === MotherShip
        );
        return mothership[0].isDead;
    }
}

const initInvasionFleet = () => {
    let invasionFleet = new AlienIvasion();
    let mothership = new Alien(MotherShip, 80, 7);
    invasionFleet.addToFleet(mothership);

    for (bombers = 0; bombers < 6; bombers++) {
        let bomber = new Alien(
            Bomber,
            68,
            10
        );
        invasionFleet.addToFleet(bomber);
    }

    for (fighters = 0; fighters < 8; fighters++) {
        let fighter = new Alien(Fighter, 60, 12);
        invasionFleet.addToFleet(fighter);
    }
    return invasionFleet;
};

const displayMothership = alien => {
    const mothership = alien[0];
    $("#mothership span").empty();    
    if(mothership.isHit) $("#mothership .hit").html('<img class="explosion" src="./assets/images/explosion.png" />');
    $("#mothership .hit-points").append(mothership.hitPoints);
};

const displayBombers = bombers => {
    $("#bombers span").empty();
    $("#bombers .wrapper .hit").each((index, element) => { 
        if (bombers[index].isHit) $(element).html('<img class="explosion" src="./assets/images/explosion.png" />');
    });

    $("#bombers div .hit-points").each((index, spanTag) => {
        const isDead = bombers[index].isDead;
        const hitPoints = bombers[index].hitPoints;
        const bomberImg = isDead
            ? bombers[index].hasDiedGraphic
            : bombers[index].isLivingGraphic;
        spanTag.append(hitPoints);    

        
    });
};

const displayFighters = fighters => {
    $("#fighters span").empty();
    $("#fighters .wrapper .hit").each((index,element) => {
        if(fighters[index].isHit) $(element).html('<img class="explosion" src="./assets/images/explosion2.png" />');
    });
    $("#fighters div .hit-points").each((index, spanTag) => {
        const isDead = fighters[index].isDead;
        const hitPoints = fighters[index].hitPoints;
        const fighterImg = isDead
            ? fighters[index].hasDiedGraphic
            : fighters[index].isLivingGraphic;
        spanTag.append(hitPoints);
    });
};

const displayPlayer = () => {
};

const displayInvasionFleet = invasionFleet => {
    displayMothership(
        invasionFleet.filter(ship => ship.type === MotherShip)
    );
    displayBombers(invasionFleet.filter(ship => ship.type === Bomber));
    displayFighters(invasionFleet.filter(ship => ship.type === Fighter));
};

const displayGameOver = () => {
    $("#mothership span").empty();
    $("#fighters span").empty();
    $("#bombers span").empty();
    $("#winning-message").removeClass("hidden");
    $("#winning-message").addClass("visible");
};

const fireLasers = () => {
    spaceArmada.damageInvader();

    displayInvasionFleet(spaceArmada.invasionFleet);
    if (spaceArmada.isMothershipDead()) {
        spaceArmada.mothershipHasDied();
        displayInvasionFleet(spaceArmada.invasionFleet);
        displayGameOver();
       // endGame();
    }
};

let spaceArmada;

const startGame = () =>{
    spaceArmada = initInvasionFleet();
    $("#winning-message").addClass("hidden");
    displayInvasionFleet(spaceArmada.invasionFleet);
    displayPlayer();
}
$(document).ready(() => {
    startGame();
});

const endGame = () =>{
    window.location.href = "https://github.com/markp112/Earth-Defence";
}
