/*
 * This file is generated by jOOQ.
 */
package co.globers.ibo.jooq.tables;


import co.globers.ibo.jooq.IboBack;
import co.globers.ibo.jooq.Keys;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.processing.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "https://www.jooq.org",
        "jOOQ version:3.13.1"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class EntityGuessingSentence extends TableImpl<Record> {

    private static final long serialVersionUID = 1679409825;

    /**
     * The reference instance of <code>ibo_back.entity_guessing_sentence</code>
     */
    public static final EntityGuessingSentence ENTITY_GUESSING_SENTENCE = new EntityGuessingSentence();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<Record> getRecordType() {
        return Record.class;
    }

    /**
     * The column <code>ibo_back.entity_guessing_sentence.id</code>.
     */
    public final TableField<Record, Integer> ID = createField(DSL.name("id"), org.jooq.impl.SQLDataType.INTEGER.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('ibo_back.entity_guessing_sentence_id_seq'::regclass)", org.jooq.impl.SQLDataType.INTEGER)), this, "");

    /**
     * The column <code>ibo_back.entity_guessing_sentence.uri</code>.
     */
    public final TableField<Record, String> URI = createField(DSL.name("uri"), org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>ibo_back.entity_guessing_sentence.entity_guessing_id</code>.
     */
    public final TableField<Record, Integer> ENTITY_GUESSING_ID = createField(DSL.name("entity_guessing_id"), org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>ibo_back.entity_guessing_sentence.sentence</code>.
     */
    public final TableField<Record, String> SENTENCE = createField(DSL.name("sentence"), org.jooq.impl.SQLDataType.VARCHAR(2046).nullable(false), this, "");

    /**
     * The column <code>ibo_back.entity_guessing_sentence.guessed_entity_id</code>.
     */
    public final TableField<Record, Integer> GUESSED_ENTITY_ID = createField(DSL.name("guessed_entity_id"), org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>ibo_back.entity_guessing_sentence.creation_datetime</code>.
     */
    public final TableField<Record, Timestamp> CREATION_DATETIME = createField(DSL.name("creation_datetime"), org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaultValue(org.jooq.impl.DSL.field("CURRENT_TIMESTAMP", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * Create a <code>ibo_back.entity_guessing_sentence</code> table reference
     */
    public EntityGuessingSentence() {
        this(DSL.name("entity_guessing_sentence"), null);
    }

    /**
     * Create an aliased <code>ibo_back.entity_guessing_sentence</code> table reference
     */
    public EntityGuessingSentence(String alias) {
        this(DSL.name(alias), ENTITY_GUESSING_SENTENCE);
    }

    /**
     * Create an aliased <code>ibo_back.entity_guessing_sentence</code> table reference
     */
    public EntityGuessingSentence(Name alias) {
        this(alias, ENTITY_GUESSING_SENTENCE);
    }

    private EntityGuessingSentence(Name alias, Table<Record> aliased) {
        this(alias, aliased, null);
    }

    private EntityGuessingSentence(Name alias, Table<Record> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    public <O extends Record> EntityGuessingSentence(Table<O> child, ForeignKey<O, Record> key) {
        super(child, key, ENTITY_GUESSING_SENTENCE);
    }

    @Override
    public Schema getSchema() {
        return IboBack.IBO_BACK;
    }

    @Override
    public Identity<Record, Integer> getIdentity() {
        return Keys.IDENTITY_ENTITY_GUESSING_SENTENCE;
    }

    @Override
    public UniqueKey<Record> getPrimaryKey() {
        return Keys.ENTITY_GUESSING_SENTENCE_PKEY;
    }

    @Override
    public List<UniqueKey<Record>> getKeys() {
        return Arrays.<UniqueKey<Record>>asList(Keys.ENTITY_GUESSING_SENTENCE_PKEY, Keys.ENTITY_GUESSING_SENTENCE_URI_KEY);
    }

    @Override
    public List<ForeignKey<Record, ?>> getReferences() {
        return Arrays.<ForeignKey<Record, ?>>asList(Keys.ENTITY_GUESSING_SENTENCE__ENTITY_GUESSING_SENTENCE_ENTITY_GUESSING_ID_FKEY, Keys.ENTITY_GUESSING_SENTENCE__ENTITY_GUESSING_SENTENCE_GUESSED_ENTITY_ID_FKEY);
    }

    public EntityGuessing entityGuessing() {
        return new EntityGuessing(this, Keys.ENTITY_GUESSING_SENTENCE__ENTITY_GUESSING_SENTENCE_ENTITY_GUESSING_ID_FKEY);
    }

    public EntityToGuess entityToGuess() {
        return new EntityToGuess(this, Keys.ENTITY_GUESSING_SENTENCE__ENTITY_GUESSING_SENTENCE_GUESSED_ENTITY_ID_FKEY);
    }

    @Override
    public EntityGuessingSentence as(String alias) {
        return new EntityGuessingSentence(DSL.name(alias), this);
    }

    @Override
    public EntityGuessingSentence as(Name alias) {
        return new EntityGuessingSentence(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public EntityGuessingSentence rename(String name) {
        return new EntityGuessingSentence(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public EntityGuessingSentence rename(Name name) {
        return new EntityGuessingSentence(name, null);
    }
}
