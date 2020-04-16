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
public class GameSession extends TableImpl<Record> {

    private static final long serialVersionUID = 2129220004;

    /**
     * The reference instance of <code>ibo_back.game_session</code>
     */
    public static final GameSession GAME_SESSION = new GameSession();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<Record> getRecordType() {
        return Record.class;
    }

    /**
     * The column <code>ibo_back.game_session.id</code>.
     */
    public final TableField<Record, Integer> ID = createField(DSL.name("id"), org.jooq.impl.SQLDataType.INTEGER.nullable(false).defaultValue(org.jooq.impl.DSL.field("nextval('ibo_back.game_session_id_seq'::regclass)", org.jooq.impl.SQLDataType.INTEGER)), this, "");

    /**
     * The column <code>ibo_back.game_session.uri</code>.
     */
    public final TableField<Record, String> URI = createField(DSL.name("uri"), org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>ibo_back.game_session.user_id</code>.
     */
    public final TableField<Record, Integer> USER_ID = createField(DSL.name("user_id"), org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>ibo_back.game_session.creation_datetime</code>.
     */
    public final TableField<Record, Timestamp> CREATION_DATETIME = createField(DSL.name("creation_datetime"), org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaultValue(org.jooq.impl.DSL.field("CURRENT_TIMESTAMP", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * Create a <code>ibo_back.game_session</code> table reference
     */
    public GameSession() {
        this(DSL.name("game_session"), null);
    }

    /**
     * Create an aliased <code>ibo_back.game_session</code> table reference
     */
    public GameSession(String alias) {
        this(DSL.name(alias), GAME_SESSION);
    }

    /**
     * Create an aliased <code>ibo_back.game_session</code> table reference
     */
    public GameSession(Name alias) {
        this(alias, GAME_SESSION);
    }

    private GameSession(Name alias, Table<Record> aliased) {
        this(alias, aliased, null);
    }

    private GameSession(Name alias, Table<Record> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    public <O extends Record> GameSession(Table<O> child, ForeignKey<O, Record> key) {
        super(child, key, GAME_SESSION);
    }

    @Override
    public Schema getSchema() {
        return IboBack.IBO_BACK;
    }

    @Override
    public Identity<Record, Integer> getIdentity() {
        return Keys.IDENTITY_GAME_SESSION;
    }

    @Override
    public UniqueKey<Record> getPrimaryKey() {
        return Keys.GAME_SESSION_PKEY;
    }

    @Override
    public List<UniqueKey<Record>> getKeys() {
        return Arrays.<UniqueKey<Record>>asList(Keys.GAME_SESSION_PKEY, Keys.GAME_SESSION_URI_KEY);
    }

    @Override
    public List<ForeignKey<Record, ?>> getReferences() {
        return Arrays.<ForeignKey<Record, ?>>asList(Keys.GAME_SESSION__GAME_SESSION_USER_ID_FKEY);
    }

    public User user() {
        return new User(this, Keys.GAME_SESSION__GAME_SESSION_USER_ID_FKEY);
    }

    @Override
    public GameSession as(String alias) {
        return new GameSession(DSL.name(alias), this);
    }

    @Override
    public GameSession as(Name alias) {
        return new GameSession(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public GameSession rename(String name) {
        return new GameSession(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public GameSession rename(Name name) {
        return new GameSession(name, null);
    }
}