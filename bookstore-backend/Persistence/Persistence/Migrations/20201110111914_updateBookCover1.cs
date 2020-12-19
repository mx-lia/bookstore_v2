using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class updateBookCover1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "BookCovers",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(10)",
                oldMaxLength: 10);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "BookCovers",
                type: "varbinary(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(byte[]));
        }
    }
}
