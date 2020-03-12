/**
 * @author robp94 / https://github.com/robp94
 */

const expect = require( 'chai' ).expect;
const YUKA = require( '../../../../build/yuka.js' );
const FuzzyJSONs = require( '../../../files/FuzzyJSONs.js' );

const RightSCurveFuzzySet = YUKA.RightSCurveFuzzySet;
const FuzzySet = YUKA.FuzzySet;

describe( 'RightSCurveFuzzySet', function () {

	describe( '#constructor()', function () {

		it( 'should create an object with correct default values', function () {

			const fuzzySet = new RightSCurveFuzzySet();

			expect( fuzzySet ).to.have.a.property( 'left' ).that.is.equal( 0 );
			expect( fuzzySet ).to.have.a.property( 'midpoint' ).that.is.equal( 0 );
			expect( fuzzySet ).to.have.a.property( 'right' ).that.is.equal( 0 );

		} );

		it( 'should apply the parameters to the new object', function () {

			const fuzzySet = new RightSCurveFuzzySet( 25, 50, 75 );

			expect( fuzzySet.left ).to.equal( 25 );
			expect( fuzzySet.midpoint ).to.equal( 50 );
			expect( fuzzySet.right ).to.equal( 75 );

			expect( fuzzySet.representativeValue ).to.equal( ( 50 + 75 ) / 2 );

		} );

		it( 'should inherit from FuzzySet', function () {

			const fuzzySet = new RightSCurveFuzzySet();

			expect( fuzzySet ).is.an.instanceof( FuzzySet );

		} );

	} );

	describe( '#computeDegreeOfMembership()', function () {

		it( 'should compute degree of membership for the given value', function () {

			const fuzzySet = new RightSCurveFuzzySet( 0, 50, 100 );

			expect( fuzzySet.computeDegreeOfMembership( 0 ) ).to.equal( 0 );
			expect( fuzzySet.computeDegreeOfMembership( 25 ) ).to.equal( 0.5 );
			expect( fuzzySet.computeDegreeOfMembership( 50 ) ).to.equal( 1 );
			expect( fuzzySet.computeDegreeOfMembership( 75 ) ).to.equal( 1 );
			expect( fuzzySet.computeDegreeOfMembership( 100 ) ).to.equal( 1 );

			// out of range values

			expect( fuzzySet.computeDegreeOfMembership( - 1 ) ).to.equal( 0 );
			expect( fuzzySet.computeDegreeOfMembership( 101 ) ).to.equal( 0 );

		} );

	} );

	describe( '#toJSON()', function () {

		it( 'should serialize this instance to a JSON object', function () {

			const fuzzySet = new RightSCurveFuzzySet( 0, 50, 100 );
			fuzzySet.uuid = '4C06581E-448A-4557-835E-7A9D2CE20D30'; // overwrite random UUID

			expect( fuzzySet.toJSON() ).to.be.deep.equal( FuzzyJSONs.RightSCurveFuzzySet );

		} );

	} );

	describe( '#fromJSON()', function () {

		it( 'should deserialize this instance from the given JSON object', function () {

			const fuzzySet1 = new RightSCurveFuzzySet( 0, 50, 100 );
			fuzzySet1.uuid = '4C06581E-448A-4557-835E-7A9D2CE20D30'; // overwrite random UUID

			const fuzzySet2 = new RightSCurveFuzzySet().fromJSON( FuzzyJSONs.RightSCurveFuzzySet );

			expect( fuzzySet1 ).to.be.deep.equal( fuzzySet2 );

		} );

	} );

} );
