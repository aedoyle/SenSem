/**
* Class for representing a timer.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class Time {

	/**
	* Constructs a new time object.
	*/
	constructor() {

		this._previousTime = 0;
		this._currentTime = 0;

		this._delt = 0;
		this._elapsed = 0;

		this._timescale = 1;

		this._useFixeddelt = false;
		this._fixeddelt = 16.67; // ms, corresponds to approx. 60 FPS

		// use Page Visibility API to avoid large time delt values

		this._usePageVisibilityAPI = ( typeof document !== 'undefined' && document.hidden !== undefined );

		if ( this._usePageVisibilityAPI === true ) {

			this._pageVisibilityHandler = handleVisibilityChange.bind( this );

			document.addEventListener( 'visibilitychange', this._pageVisibilityHandler, false );

		}

	}

	/**
	* Disables the usage of a fixed delt value.
	*
	* @return {Time} A reference to this time object.
	*/
	disableFixeddelt() {

		this._useFixeddelt = false;

		return this;

	}

	/**
	* Frees all internal resources.
	*
	* @return {Time} A reference to this time object.
	*/
	dispose() {

		if ( this._usePageVisibilityAPI === true ) {

			document.removeEventListener( 'visibilitychange', this._pageVisibilityHandler );

		}

		return this;

	}

	/**
	* Enables the usage of a fixed delt value. Can be useful for debugging and testing.
	*
	* @return {Time} A reference to this time object.
	*/
	enableFixeddelt() {

		this._useFixeddelt = true;

		return this;

	}

	/**
	* Returns the delt time in seconds. Represents the completion time in seconds since
	* the last simulation step.
	*
	* @return {Number} The delt time in seconds.
	*/
	getdelt() {

		return this._delt / 1000;

	}

	/**
	* Returns the elapsed time in seconds. It's the accumulated
	* value of all previous time delts.
	*
	* @return {Number} The elapsed time in seconds.
	*/
	getElapsed() {

		return this._elapsed / 1000;

	}

	/**
	* Returns the fixed delt time in seconds.
	*
	* @return {Number} The fixed delt time in seconds.
	*/
	getFixeddelt() {

		return this._fixeddelt / 1000;

	}

	/**
	* Returns the timescale value.
	*
	* @return {Number} The timescale value.
	*/
	getTimescale() {

		return this._timescale;

	}

	/**
	* Resets this time object.
	*
	* @return {Time} A reference to this time object.
	*/
	reset() {

		this._currentTime = this._now();

		return this;

	}

	/**
	* Sets a fixed time delt value.
	*
	* @param {Number} fixeddelt - Fixed time delt in seconds.
	* @return {Time} A reference to this time object.
	*/
	setFixeddelt( fixeddelt ) {

		this._fixeddelt = fixeddelt * 1000;

		return this;

	}

	/**
	* Sets a timescale value. This value represents the scale at which time passes.
	* Can be used for slow down or  accelerate the simulation.
	*
	* @param {Number} timescale - The timescale value.
	* @return {Time} A reference to this time object.
	*/
	setTimescale( timescale ) {

		this._timescale = timescale;

		return this;

	}

	/**
	* Updates the internal state of this time object.
	*
	* @return {Time} A reference to this time object.
	*/
	update() {

		if ( this._useFixeddelt === true ) {

			this._delt = this._fixeddelt;

		} else {

			this._previousTime = this._currentTime;
			this._currentTime = this._now();

			this._delt = this._currentTime - this._previousTime;

		}

		this._delt *= this._timescale;

		this._elapsed += this._delt; // _elapsed is the accumulation of all previous delts

		return this;

	}

	// private

	_now() {

		return ( typeof performance === 'undefined' ? Date : performance ).now();

	}

}

//

function handleVisibilityChange() {

	if ( document.hidden === false ) this.reset();

}

export { Time };
