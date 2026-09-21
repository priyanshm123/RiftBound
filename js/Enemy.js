class Enemy extends Entity {
    constructor(x, y, width, height, health, damage) {
        super(x, y, width, height);

        this.health = health;
        this.damage = damage;

        this.isDead = false;
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }

    }
}