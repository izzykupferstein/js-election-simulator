var Election = {
	candidates: [],
	init: function () {
		this.candidates = [];
		return this;
	},
	getCandidateByName: function ( name ) {
		var filter_candidate_by_name = this.candidates.filter ( function ( d ) { return d.name === name; })[0];
		var index_of_candidate = this.candidates.indexOf ( filter_candidate_by_name );
		return this.candidates[index_of_candidate];
	},
	getAllVotes: function () {
		var i, results = [];
		for ( i = 0; i < this.candidates.length; i++ ) results = results.concat ( this.candidates[i].votes );
		return results;
	},
	getNumOfVotes: function () {
		var i, count = 0;
		for ( i = 0; i < this.candidates.length; i++ ) count += this.candidates[i].votes.length;
		return count;
	},
	calculateWinner: function () {
		var max_votes = Math.max.apply ( Math, this.candidates.map ( function ( d ) {
			return d.votes.length;
		}));
		if ( ! max_votes || isNaN ( max_votes )) return false;
		var records_with_max_votes = this.candidates.filter ( function ( d ) { return d.votes.length === max_votes; });
		var result = {};
		if ( records_with_max_votes.length > 1 ) {
			result.result = 'Tied';
			result.candidates = records_with_max_votes;
			var list_of_candidate_names = records_with_max_votes.map ( function ( d ) { return d.name; }).join ( ', ' );
			result.explaination = '[Tied between ' + list_of_candidate_names + ', with a count of ' + max_votes.toLocaleString () + ' votes each]';
		}
		else if ( records_with_max_votes.length === 1 ) {
			result.result = 'Won';
			result.candidate = records_with_max_votes[0];
			result.explaination = records_with_max_votes[0].name + ' won with a count of ' + max_votes.toLocaleString () + ' votes';
		}
		return result;
	}
};

var Candidate = {
	name: null,
	message: null,
	votes: [],
	init: function ( name, message ) {
		if ( ! name ) return false;
		this.name = name;
		this.message = message || '';
		this.votes = [];
		return this;
	},
	castVote: function ( voter ) {
		this.votes.push ( voter );
		return this;
	},
	getNumOfVotesByGender: function () {
		var votesByGender = { male: 0, female: 0 };
		for ( var i = 0; i < this.votes.length; i++ ) votesByGender[this.votes[i].gender]++;
		return votesByGender;
	},
	speak: function () {
		console.log ( '\n---------------------------------------------------------------------------' );
		console.log ( ' [walks up to podium]... [taps on mic]\n Hello my fellow people, today is our day!\n [pause] I just want to say that '
			+ ( this.message || 'every vote mattered' )
			+ '.\n Thank you for voting me in and I will keep all my promises.\n [waves and then slowly walks off stage]... [cheering in the background]' );
		console.log ( '---------------------------------------------------------------------------\n' );
	}
};

var Voter = {
	name: null,
	age: null,
	gender: null,
	init: function ( name, age, gender ) {
		if ( ! name || ! age || ! gender ) return false;
		this.name = name;
		this.age = age;
		this.gender = gender;
		return this;
	}
};