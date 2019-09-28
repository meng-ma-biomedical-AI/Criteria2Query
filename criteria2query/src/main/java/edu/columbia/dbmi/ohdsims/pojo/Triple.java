package edu.columbia.dbmi.ohdsims.pojo;

import java.io.Serializable;
import java.util.List;

import edu.stanford.nlp.util.CollectionUtils;
import edu.stanford.nlp.util.logging.PrettyLoggable;
import edu.stanford.nlp.util.logging.PrettyLogger;
import edu.stanford.nlp.util.logging.Redwood.RedwoodChannels;

/**
 * Class representing an ordered triple of objects, possibly typed. Useful when
 * you'd like a method to return three objects, or would like to put triples of
 * objects in a Collection or Map. equals() and hashcode() should work properly.
 *
 * @author Teg Grenager (grenager@stanford.edu)
 */
public class Triple<T1, T2, T3> implements Comparable<Triple<T1, T2, T3>>, Serializable, PrettyLoggable {
//public class Triple<T1, T2, T3> {

//	private static final long serialVersionUID = -4182871682751645440L;
	public T1 first;
	public T2 second;
	public T3 third;
	public T1 getFirst() {
		return first;
	}
	public void setFirst(T1 first) {
		this.first = first;
	}
	public T2 getSecond() {
		return second;
	}
	public void setSecond(T2 second) {
		this.second = second;
	}
	public T3 getThird() {
		return third;
	}
	public void setThird(T3 third) {
		this.third = third;
	}
	
	public T1 first() {
		return first;
	}
	
	public T2 second() {
		return second;
	}
	
	public T3 third() {
		return third;
	}
	
	
	

	public Triple(T1 first, T2 second, T3 third) {
		super();
		this.first = first;
		this.second = second;
		this.third = third;
	}
	
	public Triple() {
		super();
		
	}
	
//	public Triple(T1 first, T2 second, T3 third) {
//		this.first = first;
//		this.second = second;
//		this.third = third;
//	}



	@SuppressWarnings("unchecked")
	@Override
	public boolean equals(Object o) {

		if (this == o) {
			return true;
		}

		if (!(o instanceof Triple)) {
			return false;
		}

		final Triple triple = (Triple) o;

		if (first != null ? !first.equals(triple.first) : triple.first != null) {
			return false;
		}
		if (second != null ? !second.equals(triple.second) : triple.second != null) {
			return false;
		}
		if (third != null ? !third.equals(triple.third) : triple.third != null) {
			return false;
		}

		return true;
	}

	@Override
	public int hashCode() {
		int result;
		result = (first != null ? first.hashCode() : 0);
		result = 29 * result + (second != null ? second.hashCode() : 0);
		result = 29 * result + (third != null ? third.hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "(" + first + "," + second + "," + third + ")";
	}

	public List<Object> asList() {
		return CollectionUtils.makeList(first, second, third);
	}

	/**
	 * Returns a Triple constructed from X, Y, and Z. Convenience method; the
	 * compiler will disambiguate the classes used for you so that you don't have to
	 * write out potentially long class names.
	 */
	public static <X, Y, Z> Triple<X, Y, Z> makeTriple(X x, Y y, Z z) {
		Triple<X,Y,Z> t = new Triple<>(x,y,z);
//		t.setFirst(x);
//		t.setSecond(y);
//		t.setThird(z);
		
		return t;
	}

	/**
	 * {@inheritDoc}
	 */
	public void prettyLog(RedwoodChannels channels, String description) {
		PrettyLogger.log(channels, description, this.asList());
	}

	@SuppressWarnings("unchecked")
	@Override
	public int compareTo(Triple<T1, T2, T3> another) {
		int comp = ((Comparable<T1>) getFirst()).compareTo(another.getFirst());
		if (comp != 0) {
			return comp;
		} else {
			comp = ((Comparable<T2>) getSecond()).compareTo(another.getSecond());
			if (comp != 0) {
				return comp;
			} else {
				return ((Comparable<T3>) getThird()).compareTo(another.getThird());
			}
		}
	}
}
