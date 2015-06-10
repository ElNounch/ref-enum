var ref = require('ref')

function Enum( defs ) {
	if (!(this instanceof Enum)) { return new Enum( defs ) }
	var th = this
	var idx = 0
	
	th._direct = {}
	th._reverse = {}

	defs.forEach( function( line ) {
		if( Array.isArray( line ) ) {
			idx = line[1]
			line = line[0]
			if( typeof idx === 'string' ) {
				idx = th._direct[ idx ]
			}
		}
		th._direct[ line ] = idx
		th._reverse[ idx ] = line
		idx = idx + 1
	})
}

var equiv = ref.types.uint

Enum.prototype.name = 'uint'
Enum.prototype.size = equiv.size
Enum.prototype.alignment = equiv.alignment
Enum.prototype.indirection = 1
Enum.prototype.get = function get (buf, offset) {
		var raw = equiv.get( buf, offset )
		return this._reverse[ raw ]
    }
Enum.prototype.set = function set (buf, offset, val) {
		var raw = this._direct[val]
		return equiv.set( buf, offset, raw )
    }

exports = module.exports = Enum
