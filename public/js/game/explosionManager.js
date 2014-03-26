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
			for(var i = 0; i < ExplosionManager.explosions.length; ++i)
			{
				ExplosionManager.explosions[i].update(fps)
				if(ExplosionManager.explosions[i]._killed){
					ExplosionManager.explosions.splice(i, 1)
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