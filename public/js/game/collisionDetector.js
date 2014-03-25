define([
	'classy',
	'game/util/utilites',
	'game/collisionCore'
], function(
	Class,
	Util,
	Core
){
	var CollisionDetector = Class.$extend({

		__init__ : function() {
		},
		// both obj1 and obj2 should contain a collision core
		// - an object representing their physical properties
		ObjectCollisionWithObject: function (obj1, obj2)
		{
			var core1 = obj1.getCore()
			var core2 = obj2.getCore()
			if(core1.isValid() && core2.isValid())
			{
				if(core1.coreIntersect(core2))
				{
					obj1.collisionReact(obj2)
					obj2.collisionReact(obj1)
				}
			}
		},

		ObjectCollisionWithObjectArray: function(obj, obj_arr)
		{
			for(i in obj_arr)
			{
				this.ObjectCollisionWithObject(obj, obj_arr[i])
			}
		},

		ObjectArrayCollisionWithObjectArray:function(obj_arr1, obj_arr2) //option for bullets collision detection
		{
			for(i in obj_arr1)
			{
				this.ObjectCollisionWithObjectArray(obj_arr1[i], obj_arr2)
			}
		}

	});
	return CollisionDetector;
});