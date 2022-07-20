"""empty message

Revision ID: 263d8cdac0a3
Revises: e5b0ea21cade
Create Date: 2022-07-20 13:15:48.959833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '263d8cdac0a3'
down_revision = 'e5b0ea21cade'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('openingdates',
    sa.Column('dateId', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=10), nullable=False),
    sa.Column('dow', sa.String(length=1), nullable=False),
    sa.Column('koma1', sa.Boolean(), nullable=False),
    sa.Column('koma2', sa.Boolean(), nullable=False),
    sa.Column('koma3', sa.Boolean(), nullable=False),
    sa.Column('koma4', sa.Boolean(), nullable=False),
    sa.Column('koma5', sa.Boolean(), nullable=False),
    sa.Column('koma6', sa.Boolean(), nullable=False),
    sa.Column('koma7', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('dateId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('openingdates')
    # ### end Alembic commands ###