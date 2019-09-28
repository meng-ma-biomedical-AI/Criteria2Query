package edu.columbia.dbmi.ohdsims.pojo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;


public class Sentence implements Cloneable {
	private String text;
	private boolean include;
	private List<Term> terms;
	private String display;
	private Integer start_index;
	private Integer end_index;
	private List<LinkedHashSet<Integer>> logic_groups;
	private List<Triple<Integer, Integer, String>> relations;
	private boolean ignore;// except some cases

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isInclude() {
		return include;
	}

	public void setInclude(boolean include) {
		this.include = include;
	}

	public List<Term> getTerms() {
		return terms;
	}

	public void setTerms(List<Term> terms) {
		this.terms = terms;
	}

	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}

	public Integer getStart_index() {
		return start_index;
	}

	public void setStart_index(Integer start_index) {
		this.start_index = start_index;
	}

	public Integer getEnd_index() {
		return end_index;
	}

	public void setEnd_index(Integer end_index) {
		this.end_index = end_index;
	}

	public List<LinkedHashSet<Integer>> getLogic_groups() {
		return logic_groups;
	}

	public void setLogic_groups(List<LinkedHashSet<Integer>> logic_groups) {
		this.logic_groups = logic_groups;
	}

	public List<Triple<Integer, Integer, String>> getRelations() {
		return relations;
	}

	public void setRelations(List<Triple<Integer, Integer, String>> relations) {
		this.relations = relations;
	}

	public boolean isIgnore() {
		return ignore;
	}

	public void setIgnore(boolean ignore) {
		this.ignore = ignore;
	}
	
	public Sentence(String text,List<Term> terms){
		this.text=text;
		this.terms=terms;
	}
	
	public Sentence(String text){
		this.text=text;
	}

	public Sentence(String text, boolean include, List<Term> terms, String display, Integer start_index,
			Integer end_index, List<LinkedHashSet<Integer>> logic_groups,
			List<Triple<Integer, Integer, String>> relations, boolean ignore) {
		super();
		this.text = text;
		this.include = include;
		this.terms = terms;
		this.display = display;
		this.start_index = start_index;
		this.end_index = end_index;
		this.logic_groups = logic_groups;
		this.relations = relations;
		this.ignore = ignore;
	}
	
	

	public Sentence() {
		super();
		// TODO Auto-generated constructor stub
	}

	// public List<String> getAllTermsInStr(){
	// List<String> allterms=new ArrayList<String>();
	// if(terms!=null){
	// for(Term t:terms){
	// allterms.add(t.getText());
	// }
	// }
	// return allterms;
	// }
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

}
