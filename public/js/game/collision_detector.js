define([
	'classy',
	'game/explosion'
], function(
	Class,
	Util
){
	var CollisionDetector = Class.$extend({
		__init__: function() {}

		_coreCollisionDetection: function(core1, core2)
		{
			return Util.intersectCircles(core1.x, core1.y, core1.r, core2.x, core2.y, core2.r)
		}
		// both obj1 and obj2 should contain a collision core
		// - an object representing their physical properties
		ObjectCollisionWithObject: function (obj1, obj2)
		{
			var core1 = obj1.getCollisionCore()
			var core2 = obj2.getCollisionCore()
			if(core1 == null || core2 == null)
			{
				// it's ok for an object to have a null 
				// collision core due to previous collisions
				return
			}
			if(_coreCollisionDetection(core1, core2))
			{
				obj1.onCollisionDetected();
				obj2.onCollisionDetected();
			}
		}

		ObjectCollisionWithObjectArray: function(obj, obj_arr)
		{
			for(i in obj_arr)
			{
				ObjectCollisionWithObject(obj, obj_arr[i])
			}
		}

		ObjectArrayCollisionWithObjectArray:function(obj_arr1, obj_arr2)
		{
			for(i in obj_arr1)
			{
				ObjectCollisionWithObjectArray(obj_arr1[i], obj_arr2)
			}
		}





	})
	return CollisionDetector;
});