define([
    'classy',
    'game/collisionCore',
    'game/explosion'
], function(
    Class,
    Core,
    ExplosionClass
){

// singletone explosion manager
var ExplosionManager = Class.$extend({

	__classvars__ : {
    	explosions: [],
    
		addExplosion: function(explosion)
		{
			ExplosionManager.explosions.push(explosion)
		},

		update: function(fps)
		{
			for(i in ExplosionManager.explosions)
			{
				ExplosionManager.explosions[i].update(fps)
				if(ExplosionManager.explosions[i]._killed){
					delete ExplosionManager.explosions[i]
				}
			}
		},

		draw: function(ctx)
		{
			for(i in ExplosionManager.explosions)
			{
				ExplosionManager.explosions[i].draw(ctx)
			}
		}
	}
})
return ExplosionManager;
})